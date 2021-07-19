import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './components/main/form';
import Weather from './components/main/weather';
import { apiKeys, dateFormat } from './components/constant/constant';
import moment from 'moment';

import './App.css';

const App = () => {
  const lang = !JSON.parse(localStorage.getItem('lang'))? "en": JSON.parse(localStorage.getItem('lang'));
  const [error, setError] = useState()
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('data')))
  const [select, setSelect] = useState(lang);
  

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(cards))
    localStorage.setItem('lang', JSON.stringify(select))
  }, [cards, select])

  const addWeather = (data) => {
    const date = new Date();
    if (data) {
      const newItem = {
        id: Math.random().toString(15),
        card: data,
        date: moment(date).format(dateFormat.DATE_TIME),
      }
      setCards([...cards, newItem])
    }
  }
  const removeKards = (id) => {
    setCards([...cards.filter((item) => item.id !== id)])
  }

  const changeSelect = (e) => {
    setSelect(e.target.value)
  }

  const getWeather = async (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKeys}&lang=${select}`);
      addWeather(response.data)
    } catch (error) {
      setError('Error');
      console.log(error)
    }
    e.target.elements.city.value = ''
  }

  return (
    <div className="App">
      <header className="header"></header>
      <div className="App-wrap">
        <Form
          getWeather={getWeather}
          changeSelect={changeSelect}
          select={select}

        />
        {cards ?
          <div className="form-block">
            {cards.map((item, i) => {
              return (
                <Weather
                  data={item.card}
                  id={item.id}
                  key={i}
                  date={item.date}
                  removeKards={removeKards}
                />

              )
            })}
          </div>
          :
          <p>{error}</p>
        }
      </div>
    </div>
  );
}

export default App;
