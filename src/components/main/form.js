import { Hint } from 'react-autocomplete-hint';

import './Styles.css'

const options = ["Dnipro", "Kyiv", "London", "Cherkasy", "Hobart"];

const Form = (props) => {
    return (
        <form onSubmit={props.getWeather}> 
            <Hint options={options}>
                <input type='text' name='city' placeholder='City name...' />
            </Hint>
            <button>Add</button>
        </form>
    )
}

export default Form;
