import { CREATE_CARD, DEL_CARD, FETCH_DATA, FETCH_DATA_GRAPH, IS_LOADING} from "./types"

const initialState = {
    cards: [],
    fetchedData: [],
    fetchedDataGraph: [],
    loading: false,
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_CARD: 
            return {...state, cards: state.cards.concat(action.payload)}
        case FETCH_DATA: 
        return { ...state, fetchedData: action.payload }
        case FETCH_DATA_GRAPH: 
        return { ...state, fetchedDataGraph: action.payload }
        case IS_LOADING:
            return { ...state, loading: action.payload }
        case DEL_CARD:
            return{...state, cards: state.cards.filter((card) => card.id !== action.payload)};
        default: return state
    }    
}
