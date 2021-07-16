import { Hint } from 'react-autocomplete-hint';
import { optionsEn, optionsUa, optionsRu } from '../constant/constant';

import './Styles.css'



const Form = ({getWeather, changeSelect, select}) => { 

let option, nameButton, namePlace

switch (select) {
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
            <form onSubmit={getWeather}> 
                <Hint options={option}>
                    <input 
                        type='text' 
                        name='city' 
                        placeholder={namePlace} 
                    />
                </Hint>
                <button>{nameButton}</button>
            </form>
            <select
                id="listLang"
                className="lang-block"
                defaultValue={select}
                onChange={changeSelect}
                >
                <option value="en"> en </option>
                <option value="ua"> ua </option>
                <option value="ru"> ru </option>
            </select>
        </div>
    )
}

export default Form;
