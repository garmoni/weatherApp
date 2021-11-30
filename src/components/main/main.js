import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
//import axios from 'axios';

import Form from './form';
// import Weather from './weather';
// import {SwitchLanguage} from './language';
// import { apiKeys, dateFormat } from '../constant/constant';
// import { Location } from './location';
// import moment from 'moment';

import './Styles.css';
import AddCards from './addCards';

const Main = ({weatherCard}) => {
    const lang = !JSON.parse(localStorage.getItem('lang')) ? "en" : JSON.parse(localStorage.getItem('lang'));
    //const dataCars = !JSON.parse(localStorage.getItem('data')) ? '' : JSON.parse(localStorage.getItem('data'))
    //const [cards, setCards] = useState(dataCars)
    const [select, setSelect] = useState(lang);
    const [input, setInput] = useState('')

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    // useEffect(() => {
    //     if (!dataCars) {
    //         Location((result) => {
    //             setInput(result);
    //            })    
    //     }
    //  }, [])
    
    useEffect(() => {
        //Save data in localStorage
        localStorage.setItem('data', JSON.stringify(weatherCard))
        localStorage.setItem('lang', JSON.stringify(select))
    }, [weatherCard, select])

    const handleButton = () => {
        setInput('')
    }

    // const getWeather = async (e) => {
    //     e.preventDefault();
    //     setCityName(input)
    //     setInput('')
    //     //Text translation from language select
    //     let language = SwitchLanguage(select)
    //     try {
    //         const responseList = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKeys}&units=metric`);
    //         var filterArr = responseList.data.list.filter(function (number) {
    //             return moment(date).isSame(number.dt_txt, 'day')
    //         });
    //         var listArr = filterArr.map(function (item) {
    //             return { name: moment(item.dt_txt).format(dateFormat.TIME), value: Math.floor(item.main.temp) }
    //         });
    //         //Add start and end point of the temperature graph for smoothing
    //         listArr.unshift({name: ' ', value: 1});
    //         listArr.push({name: '', value: 1});
    //         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKeys}&lang=${select}`);
    //         //The choice of the color of the graph depends on the temperature
    //         let colorStopStart = Math.round(response.data.main.temp) < 0 ? "#5B8CFF": "#FF715B"
    //         //Create a new card
    //         const newItem = {
    //             id: Math.random().toString(15),
    //             card: response.data,
    //             color: colorStopStart,
    //             date: moment(date).format(dateFormat.DATE_TIME),
    //             Feels_like: language[0],
    //             Wind:  language[1],
    //             Humidity:  language[2],
    //             Pressure:  language[3],
    //             Pa:  language[4],
    //             m_s:  language[5],
    //             graph: listArr,
    //         } 
    //         setCards([...cards, newItem])
    //     } catch (error) {
    //         setInput(select === 'en'? "Wrong data": select === 'ua'? "Неправильні дані": "Неправильные данные");
    //     }
    // }

    //Remove card
    // const removeCards = (id) => {
    //     setCards([...cards.filter((item) => item.id !== id)])
    // }

    const changeSelect = (e) => {
        setSelect(e.target.value)
    }

    return (
        <>
            <header className="header"></header>
            <div className="main-wrap">
                <Form
                    handleButton={handleButton}
                    changeSelect={changeSelect}
                    handleChange={handleChange}
                    input={input}
                    select={select}
                />
                <AddCards />
                {/* {cards &&
                    <div className="form-block">
                        {cards.map((item, key) => {
                            return (
                                <Weather
                                    data={item.card}
                                    colorStopStart={item.color}
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
                } */}
            </div>
        </>
    );
}
const mapStateToProps = state => {
    return {
        weatherCard: state.cards.cards
    }
  }
  
  export default connect(mapStateToProps, null)(Main)