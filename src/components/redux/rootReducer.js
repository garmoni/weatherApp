import { combineReducers } from "redux";
import {cardReducer} from "./cardReduser"

export const rootReduser = combineReducers({
    cards: cardReducer
})