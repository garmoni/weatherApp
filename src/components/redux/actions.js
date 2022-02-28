import { CREATE_CARD, FETCH_DATA, FETCH_DATA_GRAPH, DEL_CARD, IS_LOADING } from "./types";
import { apiKeys } from "../constant/constant";

export function createCard(cards) {
    return {
        type: CREATE_CARD,
        payload: cards
    }
}
export function fetchData(input, select) {
    return async dispatch =>  {
        dispatch({type: IS_LOADING, payload: true})
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKeys}&lang=${select}`)
        const json = await response.json()
        dispatch({type: FETCH_DATA, payload: json})
        dispatch({type: IS_LOADING, payload: false})
        return json
    }
}

export function fetchedDataGraph(input) {
    return async dispatch =>  {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKeys}&units=metric`);
        const json = await response.json()
        dispatch({type: FETCH_DATA_GRAPH, payload: json})
        return json
    }
}
export function delCard(id) {
    return {
        type: DEL_CARD,
        payload: id,
    }
}
