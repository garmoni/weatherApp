import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './form';
import Weather from './weather';
import { apiKeys, dateFormat } from '../constant/constant';
import moment from 'moment';

import './Styles.css';
// import { Preloader } from './loader';

export const Main = () => {
    const lang = !JSON.parse(localStorage.getItem('lang')) ? "en" : JSON.parse(localStorage.getItem('lang'));
    const dataCars = !JSON.parse(localStorage.getItem('data')) ? '' : JSON.parse(localStorage.getItem('data'))
    const [error, setError] = useState()
    const [cards, setCards] = useState(dataCars)
    const [select, setSelect] = useState(lang);
    const [input, setInput] = useState('')
    const [cityName, setCityName] = useState('')
    const date = new Date()

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const Location = () => {
        function success(position) {
            const { latitude, longitude } = position.coords
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKeys}`)
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

    const getWeather = async (e) => {
        e.preventDefault();
        setCityName(input)
        setInput('')
        try {
            const responseList = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKeys}&units=metric`);
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
                graph: listArr,
            } 
            setCards([...cards, newItem])
        } catch (error) {
            setInput('Wrong data');
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
                                />
                            )
                        })}
                    </div>
                }
            </div>
        </>
    );
}
