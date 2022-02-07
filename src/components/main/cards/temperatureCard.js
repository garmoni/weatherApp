import React from 'react';
import '../Styles.css'

class temperatureCard extends React.Component {
   
    render() {
        const {main_temp, feels_like, Feels_like, Wind, wind_speed, m_s, Humidity, humidity, Pressure, pressure, Pa, units } = this.props

        return (
            <div className="temp-block">
                <div className="temp-item">
                    <div className="temp-element">
                        {main_temp > 0 ? '+' : null}{units === 'metric' ? Math.round(main_temp) : Math.round(main_temp * 1.8 + 32)}
                    </div>
                    <div className="units-items">
                        <button
                            onClick={this.props.handleMetric}
                            className={units === 'metric' ? "metric active" : "metric"}
                        >
                            &#8451;
                        </button>
                        <span className="strip"> | </span>
                        <button
                            onClick={this.props.handleImperial}
                            className={units === 'imperial' ? "imperial active" : "imperial"}
                        >
                            &#8457;
                        </button>
                    </div>
                    <div className="feels">{`${Feels_like}: `}
                        {feels_like > 0 ? '+' : null} {units === 'metric' ? `${Math.round(feels_like)} °C` : `${Math.round(feels_like * 1.8 + 32)} °F`}
                    </div>
                </div>
                <div className="wind-block">
                    <div>{Wind}: <span>{Math.round(wind_speed)} {m_s}</span></div>
                    <div>{Humidity}: <span>{humidity}%</span></div>
                    <div>{Pressure}: <span>{pressure}{Pa}</span></div>
                </div>
            </div>
        );
    }
}

export default temperatureCard;