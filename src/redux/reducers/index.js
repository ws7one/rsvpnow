import { combineReducers } from 'redux';
import HomeReducer from './home/HomeReducer';
import ListReducer from './list/ListReducer';
import ReportsReducer from './reports/ReportsReducer';

export default combineReducers({
    homeReducer: HomeReducer,
    listReducer: ListReducer,
    reportsReducer: ReportsReducer
});
