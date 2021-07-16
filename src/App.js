import React, { useState } from 'react';
import axios from 'axios';

import Form from './components/main/form';
import Weather from './components/main/weather';
import { apiKeys, dateFormat } from './components/constant/constant';
import moment from 'moment';

import './App.css';

const App = () => {
  const date = new Date();
  const [error, setError] = useState()
  const [cards, setCards] = useState([])

  const addWeather = (data) => {
    if (data) {
      const newItem = {
        id: Math.random().toString(15),
        card: data,
        date: moment(date).format(dateFormat.DATE_TIME),
      }
      setCards([...cards, newItem])
    }
  }
  console.log(cards)
  const removeKards = (id) =>{
    setCards([...cards.filter((item) => item.id !== id)])
  }

  const getWeather = async (e)  => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKeys}&lang=en`);
      addWeather(response.data)
    } catch (error) {
      setError('Error');
    } 
    e.target.elements.city.value = ''
  }
  
  return (
    <div className="App">
      <header className="header"></header>
      <div className="App-wrap">
      <Form 
        getWeather={getWeather}

      />
         {cards ? 
         <div className="form-block">
            {cards.map((item, i) => {
              console.log(i)
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
