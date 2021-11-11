import React from 'react';
import { Hint } from 'react-autocomplete-hint';
import PropTypes from 'prop-types';
import { optionsEn, optionsUa, optionsRu } from '../constant/constant';
import {connect} from 'react-redux';

import './Styles.css'

class Form extends React.Component{
    
    render() {
    
    let option, nameButton, namePlace

    switch (this.props.select) {
        case "en":
            option = optionsEn;
            nameButton = "Add";
            namePlace = "City name...";
            break;
        case "ua":
            option = optionsUa;
            nameButton = "Додати";
            namePlace = "Назва міста ..."
            break;
        case "ru":
            option = optionsRu;
            nameButton = "Добавить";
            namePlace = "Название города..."
            break;
        default:
    }
        return (
            <div className="top-form">
                <form onSubmit={this.props.getWeather}>
                    <Hint options={option}>
                        <input
                            type='text'
                            name='city'
                            placeholder={namePlace}
                            value={this.props.input}
                            onChange={this.props.handleChange}
                        />
                    </Hint>
                    <button className="form-button">{nameButton}</button>
                </form>
                <select
                    id="listLang"
                    className="lang-block"
                    defaultValue={this.props.select}
                    onChange={this.props.changeSelect}
                >
                    <option value="en"> en </option>
                    <option value="ua"> ua </option>
                    <option value="ru"> ru </option>
                </select>
            </div>
        )
    }
}

Form.propTypes = {
    select: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    handleChange: PropTypes.func,
    changeSelect: PropTypes.func,
    getWeather: PropTypes.func
}

const mapDispatchToProps = {
    
}

export default connect(null, mapDispatchToProps)(Form);
