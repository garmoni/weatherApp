import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { delCard } from '../redux/actions';
import { CurveWeather } from './curveWeather';

import './Styles.css'

const AddCards = ({ weatherCard }) => {

  const [units, setUnits] = useState('metric')
  const dispatch = useDispatch()
  //const removeCard = useSelector(state => state.cards.delCard)

  const handleMetric = () => {
    setUnits('metric')
  }
  const handleImperial = () => {
    setUnits('imperial')
  }

  if (weatherCard.length) {
    return (
      <div className="cards-block">
        {weatherCard.map(card =>
          <div className="form-wrap" key={card.id} 
          style={{ backgroundColor: card.main_temp > 0 ? "#fff1fe" : "#f1f2ff" }}
          >
            <div className="form-header">
              <div className="name-block">
                <div className="name">{card.name_city}, {card.sys_country}</div>
                <div className="date">{card.date}</div>
              </div>
              <div className="img-block">
                <img className="img-fluid" src={`https://openweathermap.org/img/wn/${card.icon}@2x.png`} alt="" />
                <span className="description">{card.discript}</span>
              </div>
            </div>
            <CurveWeather width={300} height={50} id={card.id} time={card.graph} units={units} colorStopStart={card.color} />
            <div className="form-bottom">
              <div className="temp-block">
                <div className="temp-item">
                  <div className="temp-element">{card.main_temp > 0 ? '+' : null}{units === 'metric' ? Math.round(card.main_temp) : Math.round(card.main_temp * 1.8 + 32)}</div>
                  <div className="units-items">
                    <button onClick={handleMetric} className={units === 'metric' ? "metric active" : "metric"}>&#8451;</button>
                    <span className="strip"> | </span>
                    <button href="" onClick={handleImperial} className={units === 'imperial' ? "imperial active" : "imperial"}>&#8457;</button>
                  </div>
                  <div className="feels">{card.Feels_like}: {card.feels_like > 0 ? '+' : null} {units === 'metric' ? `${Math.round(card.feels_like)} °C` : `${Math.round(card.feels_like * 1.8 + 32)} °F`}  </div>
                </div>
                <div className="wind-block">
                  <div>{card.Wind}: <span>{Math.round(card.wind_speed)} {card.m_s}</span></div>
                  <div>{card.Humidity}: <span>{card.humidity}%</span></div>
                  <div>{card.Pressure}: <span>{card.pressure}{card.Pa}</span></div>
                </div>
              </div>
            </div>
            <div className="del" onClick={() => dispatch(delCard(card.id))}>&#10006;</div>
          </div>
        )}
      </div>
    )

  } else return <></>

}
const mapStateToProps = state => {
  return {
    weatherCard: state.cards.cards
  }
}
const mapDispatchToProps = {
  delCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCards)