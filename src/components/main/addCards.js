import React from 'react';
import { connect } from 'react-redux';
import { delCard } from '../redux/actions';
import { CurveWeather } from './curveWeather';

import './Styles.css'

class AddCards extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      units: 'metric',
    }
  }

  // handleMetric () {
  //     this.setState({units:'metric'})
  // }
  // handleImperial () {
  //   this.setState({units:'imperial'})
  // }
  render() {
    console.log(this.props.weatherCard)
    return (
      <div className="cards-block">
        {this.props.weatherCard.map(card =>
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
            <CurveWeather width={300} height={50} id={card.id} time={card.graph} units={this.units} colorStopStart={card.color} />
            <div className="form-bottom">
              <div className="temp-block">
                <div className="temp-item">
                  <div className="temp-element">
                    {(Math.round(card.main_temp) > 0 ? `+ ${Math.round(card.main_temp)}` : Math.round(card.main_temp))}
                  </div>
                  <div className="units-items">
                    <button onClick={this.handleMetric} className={this.state.units === 'metric' ? "metric active" : "metric"}
                    >
                      &#8451;
                      </button>
                    <span className="strip"> | </span>
                    <button href="" onClick={this.handleImperial} className={this.state.units === 'imperial' ? "imperial active" : "imperial"}>&#8457;</button>
                  </div>
                  <div className="feels">{`${card.Feels_like}: `}
                    {`${(Math.round(card.feels_like) > 0 ? `+ ${Math.round(card.feels_like)}`: Math.round(card.feels_like))} °C`}  
                  </div>
                </div>
                <div className="wind-block">
                  <div>{card.Wind}: <span>{Math.round(card.wind_speed)} {card.m_s}</span></div>
                  <div>{card.Humidity}: <span>{card.humidity}%</span></div>
                  <div>{card.Pressure}: <span>{card.pressure}{card.Pa}</span></div>
                </div>
              </div>
            </div>
            <button 
              className="del"
              onClick={(e) => {
                this.props.delCard(card.id)
              }}
            >
              &#10006;
            </button>
          </div>
        )}
      </div>
    )
  }
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