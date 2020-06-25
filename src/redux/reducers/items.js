import {
    FETCH_ITEMS_BEGIN,
    FETCH_ITEMS_SUCCESS,
    SORTED_ITEMS_BY,
    FILTERED_SELECT,
} from "../actions/items";
import { sortBy } from 'lodash'

const initialState = {
    items: [],
    loading: false,
    selectValue: ''
};

export default function itemsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items,
            };
        case SORTED_ITEMS_BY:
            console.log(action, state);
            return {
                ...state,
                loading: false,
                items: sortBy(state.items, action.column)
            };
        case FILTERED_SELECT:
            console.log('FILTERED', action, state);
            return {
                ...state,
                loading: false,
                items: state.items.filter(i => i.role === action.payload)
            };
        default:
            return state;
    }
}
