import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './form';
import Weather from './weather';
import { apiKeys, dateFormat, textEn, textUa, textRu } from '../constant/constant';
import moment from 'moment';

import './Styles.css';

export const Main = () => {
    const lang = !JSON.parse(localStorage.getItem('lang')) ? "en" : JSON.parse(localStorage.getItem('lang'));
    const dataCars = !JSON.parse(localStorage.getItem('data')) ? '' : JSON.parse(localStorage.getItem('data'))
    const [error, setError] = useState()
    const [cards, setCards] = useState(dataCars)
    const [select, setSelect] = useState(lang);
    const [input, setInput] = useState('')
    const [cityName, setCityName] = useState('')
    const date = new Date()
    let Feels_like, Wind, Humidity, Pressure, Pa, m_s

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const Location = () => {
        function success(position) {
            const { latitude, longitude } = position.coords
            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKeys}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setInput(result[0].name)
                    },
                    (error) => {
                        setError(error);
                    }
                )
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }

    useEffect(() => {
        if (!cards) {
            Location();
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(cards))
        localStorage.setItem('lang', JSON.stringify(select))
    }, [cards, select])

    switch (select) {
        case "en":
            Feels_like = textEn.FEELS_LIKE;
            Wind = textEn.WIND;
            Humidity = textEn.HUMIDITY;
            Pressure = textEn.PRESSURE;
            Pa = textEn.PA;
            m_s = textEn.M_S;
            break;
        case "ua":
            Feels_like = textUa.FEELS_LIKE;
            Wind = textUa.WIND;
            Humidity = textUa.HUMIDITY;
            Pressure = textUa.PRESSURE;
            Pa = textUa.PA;
            m_s = textUa.M_S;
            break;
        case "ru":
            Feels_like = textRu.FEELS_LIKE;
            Wind = textRu.WIND;
            Humidity = textRu.HUMIDITY;
            Pressure = textRu.PRESSURE;
            Pa = textRu.PA;
            m_s = textRu.M_S;
            break;
        default:
    }


    const getWeather = async (e) => {
        e.preventDefault();
        setCityName(input)
        setInput('')
        try {
            const responseList = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKeys}&units=metric`);
            var filterArr = responseList.data.list.filter(function (number) {
                return moment(date).isSame(number.dt_txt, 'day')
            });
            var listArr = filterArr.map(function (item) {
                return { name: moment(item.dt_txt).format(dateFormat.TIME), value: Math.floor(item.main.temp) }
            });
            listArr.unshift({name: ' ', value: 1});
            listArr.push({name: '', value: 1});
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKeys}&lang=${select}`);
            const newItem = {
                id: Math.random().toString(15),
                card: response.data,
                date: moment(date).format(dateFormat.DATE_TIME),
                Feels_like: Feels_like,
                Wind: Wind,
                Humidity: Humidity,
                Pressure: Pressure,
                Pa: Pa,
                m_s: m_s,
                graph: listArr,
            } 
            setCards([...cards, newItem])
        } catch (error) {
            setInput(select === 'en'? "Wrong data": select === 'ua'? "Неправильні дані": "Неправильные данные");
        }
    }

    const removeCards = (id) => {
        setCards([...cards.filter((item) => item.id !== id)])
    }

    const changeSelect = (e) => {
        setSelect(e.target.value)
    }

    return (
        <>
            <header className="header"></header>
            <div className="main-wrap">
                <Form
                    getWeather={getWeather}
                    changeSelect={changeSelect}
                    handleChange={handleChange}
                    input={input}
                    select={select}
                />
                {cards &&
                    <div className="form-block">
                        {cards.map((item, key) => {
                            return (
                                <Weather
                                    data={item.card}
                                    id={item.id}
                                    date={item.date}
                                    removeCards={removeCards}
                                    input={cityName}
                                    time={item.graph}
                                    key={key}
                                    Feels_like={item.Feels_like}
                                    Wind={item.Wind}
                                    Humidity={item.Humidity}
                                    Pressure={item.Pressure}
                                    Pa={item.Pa}
                                    m_s={item.m_s}
                                />
                            )
                        })}
                    </div>
                }
            </div>
        </>
    );
}
