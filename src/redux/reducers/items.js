import {
    FETCH_ITEMS_BEGIN,
    FETCH_ITEMS_SUCCESS,
    SORTED_ITEMS_BY,
    FILTERED_SELECT, FILTERED_CHECKBOX, SUBMIT_FORM, EDIT_WORKER, SUBMIT_EDIT_FORM,
} from "../actions/items";
import { sortBy } from 'lodash'

const initialState = {
    items: [],
    filteredItems: [],
    loading: false,
    selectValue: '',
    filter: {
        role: '',
        isArchive: false
    },
    filteredColumn: ''
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
                items: sortBy(state.items, action.column),
                filteredColumn: action.column

            };
        case FILTERED_SELECT:

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
            return {
                ...state,
                items: [...state.items, {id: state.items.length + 1,...action.user}]
            };
        case EDIT_WORKER:
            const index = state.items.findIndex(item => item.id === action.id);
            const newItems = state.items.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        isEdit: !item.isEdit
                    }
                }
                return item;
            })

            return {
                ...state,
                items: newItems
            };

        case SUBMIT_EDIT_FORM:

            return {
                ...state,
                items: state.items.map(item => item.id === action.user.id ? {...action.user} : item),
                filteredItems: state.filteredItems.map(item => item.id === action.user.id ? {...action.user} : item),
            }

        default:
            return state;
    }
}
