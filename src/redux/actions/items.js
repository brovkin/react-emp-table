import itemsFromFile from '../../assets/employees';

export const FETCH_ITEMS_BEGIN = 'FETCH_ITEMS_BEGIN';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const SORTED_ITEMS_BY = 'SORTED_ITEMS_BY';
export const FILTERED_SELECT = 'FILTERED_SELECT';

export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
});

export const fetchItemsSuccess = items => ({
    type: FETCH_ITEMS_SUCCESS,
    payload: { items }
});

export function fetchItems() {
    return dispatch => {
        dispatch(fetchItemsBegin());
        console.log(itemsFromFile);
        return dispatch(fetchItemsSuccess(itemsFromFile));
    }
}
