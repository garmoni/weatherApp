import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { Location } from './location';
import Form from './form';

import './Styles.css';
import AddCards from './addCards';

const Main = () => {
    //const dispatch = useDispatch();
    const lang = !JSON.parse(localStorage.getItem('lang')) ? "en" : JSON.parse(localStorage.getItem('lang'));
    const [select, setSelect] = useState(lang);
    const [input, setInput] = useState('')
    const weatherCard = useSelector((state) => state.cards.cards);

    const handleChange = (event) => {
        setInput(event.target.value);
    }

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

    const handleButton = () => {
        setInput('')
    }

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
                <div className="cards-block">
                    {weatherCard.map((card, id) =>(
                        <AddCards card={card} key={id}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default connect(null, null)(Main)