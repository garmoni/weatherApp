import React, { useState } from 'react';
import { CurveWeather } from './curveWeather';
import PropTypes from 'prop-types';

import './Styles.css';

const Weather = ({ id, data, date, time, Feels_like, Wind, Humidity, Pressure, Pa, m_s, removeCards, colorStopStart }) => {
    const [units, setUnits] = useState('metric')

    const handleMetric = () => {
        setUnits('metric')
    }
    const handleImperial = () => {
        setUnits('imperial')
    }

    return (
        <div className="form-wrap" key={id} style={{backgroundColor: data.main.temp > 0?"#fff1fe":"#f1f2ff"} }>
            <div className="form-header">
                <div className="name-block">
                    <div className="name">{data.name}, {data.sys.country}</div>
                    <div className="date">{date}</div>
                </div>
                <div className="img-block">
                    <img className="img-fluid" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                    <span className="description">{data.weather[0].main}</span>
                </div>
            </div>
            <CurveWeather width={300} height={50} id = {id} time={time} units={units} colorStopStart={colorStopStart}/>
            <div className="form-bottom">
                <div className="temp-block">
                    <div className="temp-item">
                        <div className="temp-element">{data.main.temp > 0 ? '+' : null}{units === 'metric' ? Math.round(data.main.temp) : Math.round(data.main.temp * 1.8 + 32)}</div>
                        <div className="units-items">
                            <button onClick={handleMetric} className={units === 'metric' ? "metric active" : "metric"}>&#8451;</button>
                            <span className="strip"> | </span>
                            <button href="" onClick={handleImperial} className={units === 'imperial' ? "imperial active" : "imperial"}>&#8457;</button>
                        </div>
                        <div className="feels">{Feels_like}: {data.main.feels_like > 0 ? '+' : null} {units === 'metric' ? `${Math.round(data.main.feels_like)} °C` : `${Math.round(data.main.feels_like * 1.8 + 32)} °F`}  </div>
                    </div>
                    <div className="wind-block">
                        <div>{Wind}: <span>{Math.round(data.wind.speed)} {m_s}</span></div>
                        <div>{Humidity}: <span>{data.main.humidity}%</span></div>
                        <div>{Pressure}: <span>{data.main.pressure}{Pa}</span></div>
                    </div>
                </div>
            </div>
            <div className="del" onClick={() => removeCards(id)}>&#10006;</div>
        </div>
    )
}

Weather.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object, 
    date: PropTypes.string.isRequired,
    removeCards: PropTypes.func
}

export default Weather;
