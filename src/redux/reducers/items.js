import {
    FETCH_ITEMS_BEGIN,
    FETCH_ITEMS_SUCCESS,
    SORTED_ITEMS_BY,
    FILTERED_SELECT, FILTERED_CHECKBOX, SUBMIT_FORM,
} from "../actions/items";
import { sortBy } from 'lodash'

const initialState = {
    items: [],
    filteredItems: [],
    loading: false,
    selectValue: '',
    filter: {
        role: '',
        isArchive: null
    },
    newUser: {
        id: 18,
        name: '',
        phone: '',
        role: '',
        birthday: '',
        inArchive: false
    }
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
                items: action.items
            };
        case SORTED_ITEMS_BY:
            return {
                ...state,
                loading: false,
                items: sortBy(state.items, action.column)
            };
        case FILTERED_SELECT:
            console.log('FILTERED', action, state);

            return {
                ...state,
                filter: action.value,
                filteredItems: state.items.filter(item => {
                    if (action.value.isArchive) {
                        return item.role === action.value.role && item.isArchive;
                    } else {
                        return item.role === action.value.role;
                    }
                })
            };
        case FILTERED_CHECKBOX:
            console.log(action.value);
            console.log(state);

            return {
                ...state,
                filter: action.value,
                filteredItems: state.items.filter(item => {
                    if (action.value.isArchive) {
                        return (item.role === action.value.role || !action.value.role) && item.isArchive;
                    } else {
                        return item.role === action.value.role || !action.value.role === '';
                    }
                })
            };
        case SUBMIT_FORM:
            console.log('test', state);
            console.log('test', action.user);
            return {
                ...state,
                items: [...state.items, {id: state.items.length + 1,...action.user}]
            };

        default:
            return state;
    }
}
