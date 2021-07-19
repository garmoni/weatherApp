import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './components/main/form';
import Weather from './components/main/weather';
import { apiKeys, dateFormat } from './components/constant/constant';
import moment from 'moment';

import './App.css';

const App = () => {
  const lang = !JSON.parse(localStorage.getItem('lang'))? "en": JSON.parse(localStorage.getItem('lang'));
  const dataCars = !JSON.parse(localStorage.getItem('data'))?'':JSON.parse(localStorage.getItem('data'))
  const [error, setError] = useState()
  const [cards, setCards] = useState(dataCars)
  const [select, setSelect] = useState(lang);
  const [input, setInput] = useState('')

  const geoFindMe = (e) => {
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      const getLocation = async () => {
        try {
          const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKeys}`);
          setInput(response.data[0].name)
        } catch (error) {
          console.log(error)
        }
      }
      getLocation()
    }
    navigator.geolocation.getCurrentPosition(success)
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  if(!dataCars){
    geoFindMe()
  }
  
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
    console.log(input)
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKeys}&lang=${select}`);
      addWeather(response.data)
      setInput('')
    } catch (error) {
      setError('Error');
      console.log(error)
    }
  }
  console.log(input)

  return (
    <div className="App">
      <header className="header"></header>
      <div className="App-wrap">
        <Form
          getWeather={getWeather}
          changeSelect={changeSelect}
          handleChange={handleChange}
          input={input}
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
