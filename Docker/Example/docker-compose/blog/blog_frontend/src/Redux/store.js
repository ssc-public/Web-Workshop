import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import logger from "redux-logger";
import reducer from "./reducers.js";
const middlewares = [thunk,logger];



export default function configureStore(initialState) {
    const store = createStore(reducer, initialState,
        applyMiddleware(...middlewares));
    return store;
}