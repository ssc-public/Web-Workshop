import { checkUsernameApi, checkVerificationCodeApi } from '../apis/authApi';
import { SET_TOKEN } from './actionTypes';

export const setToken = payload => ({
    type: SET_TOKEN,
    payload,
});

export const checkUsername = username => {
    return fetch(checkUsernameApi, {
        body: JSON.stringify({ username }),
        method: 'POST',
    })
        .then(res => res.json())
        .then(response => {
            return response;
        });
};

export const verifyCode = code => {
    return fetch(checkVerificationCodeApi, {
        body: JSON.stringify({ code }),
        method: 'PUT',
    })
        .then(res => res.json())
        .then(response => {
            return response;
        });
};
