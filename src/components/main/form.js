import React from 'react';
import { Hint } from 'react-autocomplete-hint';
import PropTypes from 'prop-types';
import { optionsEn, optionsUa, optionsRu, dateFormat } from '../constant/constant';
import {connect} from 'react-redux';
import {createCard, fetchData, fetchedDataGraph} from '../redux/actions'
import {SwitchLanguage} from './language';
import moment from 'moment';

import './Styles.css'
class Form extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isInput: true,
            date: new Date(),
            listArr: []
        }
      }

      getWeather = event => {
        event.preventDefault()
        let date = new Date()
        this.props.fetchedDataGraph(this.props.input)
        .then((data) => {           
            var filterArr = data.list.filter(function (number) {
                return moment(date).isSame(number.dt_txt, 'day')
            });
            var listArr = filterArr.map(function (item) {
                return { name: moment(item.dt_txt).format(dateFormat.TIME), value: Math.floor(item.main.temp) }
            });
            listArr.unshift({name: ' ', value: 1});
            listArr.push({name: '', value: 1});
            return this.setState({listArr: listArr})
        })
        .catch ((e) => {
            return console.log(e)
         })
         .finally(() => {this.getData()})
      }

      getData = () => {
        let language = SwitchLanguage(this.props.select)       
        this.props.fetchData(this.props.input, this.props.select) 
        .then((json) => {
          const newCard = {
              id: Math.random().toString(15),
              name_city: json.name,
              main_temp: json.main.temp,
              sys_country: json.sys.country,
              icon: json.weather[0].icon,
              discript: json.weather[0].main,
              feels_like: json.main.feels_like,
              wind_speed: json.wind.speed,
              humidity: json.main.humidity,
              pressure: json.main.pressure,
              color: Math.round(json.main.temp) < 0 ? "#5B8CFF": "#FF715B",
              date: moment(this.state.date).format(dateFormat.DATE_TIME),
              Feels_like: language[0],
              Wind:  language[1],
              Humidity:  language[2],
              Pressure:  language[3],
              Pa:  language[4],
              m_s:  language[5],
              graph: this.state.listArr,
          }
          this.props.createCard(newCard)
          this.setState({isInput: true})
          })
          .catch ((e) => {
              this.setState({isInput: false})
              return console.log(e)
           })
           .finally(() => {this.props.handleButton()})
      }
    
    render() {

    let option, nameButton, namePlace, errorData
    switch (this.props.select) {
        case "en":
            option = optionsEn;
            nameButton = "Add";
            namePlace = "City name...";
            errorData = "Wrong data";
            break;
        case "ua":
            option = optionsUa;
            nameButton = "Додати";
            namePlace = "Назва міста ...";
            errorData = "Неправильні дані";
            break;
        case "ru":
            option = optionsRu;
            nameButton = "Добавить";
            namePlace = "Название города...";
            errorData = "Неправильные данные";
            break;
        default:
    }

        return (
            <div className="top-form">
                <form onSubmit={this.getWeather}>
                    <Hint options={option}>
                        <input
                            type='text'
                            name='name'
                            placeholder={this.state.isInput? namePlace: errorData}
                            value={this.props.input}
                            onChange={this.props.handleChange}
                        />
                    </Hint>
                    <button className="form-button" >{nameButton}</button>
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
    createCard, fetchData, fetchedDataGraph
}

export default connect(null, mapDispatchToProps)(Form);
