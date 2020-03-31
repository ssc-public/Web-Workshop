import { combineReducers } from 'redux';
import { tokenReducer } from './authReducers';

let rootReducers = combineReducers({
    userToken: tokenReducer,
});

export default rootReducers;
