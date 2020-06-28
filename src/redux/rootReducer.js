import { combineReducers } from "redux";
import itemsStorage from './reducers/items';
import worker from './reducers/worker';

export default combineReducers({
    itemsStorage,
    worker
})
