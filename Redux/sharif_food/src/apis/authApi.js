import { usersApi } from './baseApi';

export const checkUsernameApi = `${usersApi}register/`;

export const checkVerificationCodeApi = `${checkUsernameApi}verify/`;
