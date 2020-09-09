import { combineReducers } from 'redux';
import HomeReducer from './home/HomeReducer';
import ListReducer from './list/ListReducer';

export default combineReducers({
    homeReducer: HomeReducer,
    listReducer: ListReducer
});
