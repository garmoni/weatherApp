import { CREATE_CARD, DEL_CARD, FETCH_DATA} from "./types"

const initialState = {
    cards: [],
    fetchedData: []
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_CARD: 
            return {...state, cards: state.cards.concat(action.payload)}
            //return {...state, cards: [...state.cards, action.payload]}
        case FETCH_DATA: 
        return { ...state, fetchedData: action.payload }
        case DEL_CARD:    
        default: return state
    }
    
}