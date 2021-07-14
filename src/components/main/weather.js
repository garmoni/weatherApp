import React, { useState, useEffect } from 'react';
import './Styles.css';
import moment from 'moment';
import { dateFormat } from '../constant/constant'; 

const Weather = (props) => {
    const date = new Date();
    const [units, setUnits] = useState('metric')

    const hendleMetric = () => {
        setUnits('metric')
    }
    const hendleImperial = () => {
        setUnits('imperial')
    } 

    return (
        <div className="form-block">
            {props.name &&
             <div className="form-wrap">
                 <div className="form-header">
                    <div className="name-block">
                        <div className="name">{props.name}, {props.country}</div>
                        <div className="date">{moment(date).format(dateFormat.DATE_TIME)}</div>
                    </div>
                    <div className="img-block">
                        <img className="img-fluid" src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt=""/>
                        <span className="description">{props.descrip}</span>
                    </div>
                </div>
                  <div className="form-bottom">
                <div className="temp-block">
                    <div className="temp-item">
                        <div className="temp-element">{props.temp > 0 ? '+': null}{units === 'metric'? Math.round(props.temp):  Math.round(props.temp * 1.8 + 32)}</div>
                        <div className="units-items"> 
                            <a onClick={hendleMetric} className={units === 'metric'? "metric active" : "metric"}>&#8451;</a> 
                            <span className="strip"> | </span> 
                            <a onClick={hendleImperial} className={units === 'imperial'? "imperial active" : "imperial"}>&#8457;</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            }  
        </div>
    )
}

export default Weather;
