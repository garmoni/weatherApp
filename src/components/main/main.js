import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { Location } from './location';
import Form from './form';

import './Styles.css';
import AddCards from './cards/addCards';

const Main = () => {

    const lang = !JSON.parse(localStorage.getItem('lang')) ? "en" : JSON.parse(localStorage.getItem('lang'));
    const [input, setInput] = useState('')
    const [select, setSelect] = useState(lang);
    const weatherCard = useSelector((state) => state.cards.cards);

    useEffect(() => {
        if (localStorage.getItem('redux-store') == null)
        {
            Location((result) => {
                setInput(result);
               })
        }
    })
    
    useEffect(() => {
        localStorage.setItem('lang', JSON.stringify(select))
    }, [select])

    return (
        <>
            <header className="header"></header>
            <div className="main-wrap">
                <Form
                    handleButton={() => setInput('')}
                    changeSelect={(e) => setSelect(e.target.value)}
                    handleChange={(e) => setInput(e.target.value)}
                    input={input}
                    select={select}
                />
                <div className="cards-block">
                    { weatherCard.map((card, id) =>(<AddCards card={card} key={id}/>))}
                </div>
            </div>
        </>
    );
}

export default connect(null, null)(Main)