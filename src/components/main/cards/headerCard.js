import React from 'react';
import '../Styles.css'

const HeaderCard = ({name_city, sys_country, date, icon, discript}) => {

    return (
        <div className="card-header">
            <div className="name-block">
                <div className="name">{name_city}, {sys_country}</div>
                <div className="date">{date}</div>
            </div>
            <div className="img-block">
                <img className="img-fluid" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                <span className="description">{discript}</span>
            </div>
        </div>
    )
}

export default HeaderCard