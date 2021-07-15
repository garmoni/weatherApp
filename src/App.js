import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/main/form';
import Weather from './components/main/weather';
import { apiKeys } from './components/constant/constant';

import './App.css';

const App = () => {

  const [data, setData] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [icon, setIcon] = useState(undefined)
  const [descrip, setDescrip] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [temp, setTemp] = useState('')
  const [pressure, setPressure] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [feels, setFeels] = useState(undefined)

  useEffect(() => {
    if (data !== undefined){
      setData(data)
      setName(data.name)
      setTemp(data.main.temp)
      setFeels(data.main.feels_like)
      setPressure(data.main.pressure)
      setHumidity(data.main.humidity)
      setCountry(data.sys.country)
      setIcon(data.weather[0].icon)
      setDescrip(data.weather[0].main)
      setWind(data.wind.speed)
      setError('')
    }    
  }, [data, name]);

  console.log(pressure)
  const getWeather = async (e)  => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKeys}&lang=en`);
      setData(response.data);
    } catch (error) {
      setError('Error');
    } 
  }

  return (
    <div className="App">
      <header className="header"></header>
      <div className="App-wrap">
      <Form getWeather={getWeather}/>
      <Weather 
          name={name}
          error={error}
          temp={temp}
          feels={feels}
          country={country}
          icon={icon}
          descrip={descrip}
          wind={wind}
          pressure={pressure}
          humidity={humidity}
      />
     </div>
    </div>
  );
}

export default App;
