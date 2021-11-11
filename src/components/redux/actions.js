import { CREATE_CARD, FETCH_DATA } from "./types";
import { apiKeys } from "../constant/constant";

export function createCard(cards) {
    return {
        type: CREATE_CARD,
        payload: cards
    }
}
export function fetchData(input, select) {
    return async dispatch =>  {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKeys}&lang=${select}`)
        const json = await response.json()
        dispatch({type: FETCH_DATA, payload: json})
    }
}

