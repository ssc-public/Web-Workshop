import { SET_TOKEN } from '../actions/actionTypes';

export const tokenReducer = (state = null, { type, payload }) => {
    switch (type) {
        case SET_TOKEN:
            return payload;
        default:
            return state;
    }
};
