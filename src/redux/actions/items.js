import itemsFromFile from '../../assets/employees';

export const FETCH_ITEMS_BEGIN = 'FETCH_ITEMS_BEGIN';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const SORTED_ITEMS_BY = 'SORTED_ITEMS_BY';
export const FILTERED_SELECT = 'FILTERED_SELECT';
export const FILTERED_CHECKBOX = 'FILTERED_CHECKBOX';

export const SUBMIT_FORM = 'SUBMIT_FORM';

export const EDIT_WORKER = 'EDIT_WORKER';

export const SUBMIT_EDIT_FORM = 'SUBMIT_EDIT_FORM';

export const editWorker = id => ({
   type: EDIT_WORKER,
   id
});

export const submitForm = user => ({
    type: SUBMIT_FORM,
    user
});

export const submitEditForm = user => ({
    type: SUBMIT_EDIT_FORM,
    user
});

export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
});

export const fetchItemsSuccess = items => ({
    type: FETCH_ITEMS_SUCCESS,
    items
});

export const sortedItems = column => ({
    type: SORTED_ITEMS_BY,
    column
});

export const filteredSelectSuccess = value => ({
    type: FILTERED_SELECT,
    value
});

export const filteredCheckboxSuccess = value => ({
    type: FILTERED_CHECKBOX,
    value
});

export function fetchItems() {
    return dispatch => {
        dispatch(fetchItemsBegin());
        const items = itemsFromFile.map(item => {
            return { ...item, isEdit: false }
        });
        setTimeout(() => {
            return dispatch(fetchItemsSuccess(items));
        }, 1000);
    }
}

export function filteredSelect(event) {
    return (dispatch, getState) => {
        const filter = { ...getState().itemsStorage.filter };
        filter.role = event.target.value;
        return dispatch(filteredSelectSuccess(filter))
    }
}

export function filteredCheckbox(event) {
    return (dispatch, getState) => {
        const filter = { ...getState().itemsStorage.filter };
        event.target.checked ? filter.isArchive = true : filter.isArchive = false;
        return dispatch(filteredCheckboxSuccess(filter))
    }
}
