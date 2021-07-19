import React, { useState } from 'react';
import './Styles.css';

const Weather = ({ id, data, date, removeKards }) => {
    const [units, setUnits] = useState('metric')

    const hendleMetric = () => {
        setUnits('metric')
    }
    const hendleImperial = () => {
        setUnits('imperial')
    }

    return (
        <div className="form-wrap" key={id}>
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
            <div className="form-bottom">
                <div className={data.main.temp > 0 ? "top" : "top cold"}></div>
                <div className="temp-block">
                    <div className="temp-item">
                        <div className="temp-element">{data.main.temp > 0 ? '+' : null}{units === 'metric' ? Math.round(data.main.temp) : Math.round(data.main.temp * 1.8 + 32)}</div>
                        <div className="units-items">
                            <button onClick={hendleMetric} className={units === 'metric' ? "metric active" : "metric"}>&#8451;</button>
                            <span className="strip"> | </span>
                            <button href="" onClick={hendleImperial} className={units === 'imperial' ? "imperial active" : "imperial"}>&#8457;</button>
                        </div>
                        <div className="feels">Feels like: {data.main.feels_like > 0 ? '+' : null} {units === 'metric' ? `${Math.round(data.main.feels_like)} °C` : `${Math.round(data.main.feels_like * 1.8 + 32)} °F`}  </div>
                    </div>
                    <div className="wind-block">
                        <div>Wind: <span>{Math.round(data.wind.speed)} m/s</span></div>
                        <div>Humidity: <span>{data.main.humidity}%</span></div>
                        <div>Pressure: <span>{data.main.pressure}Pa</span></div>
                    </div>
                </div>
            </div>
            <div className="del" onClick={()=>removeKards(id)}>&#10006;</div>
        </div>
    )
}

export default Weather;
