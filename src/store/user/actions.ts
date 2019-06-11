import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '@app/store/user/constants';
import { AuthActionTypes } from '@app/store/user/models';

export function loginStart(username: string, password: string): AuthActionTypes {
  return {
    type: LOGIN_START,
    payload: {
      username,
      password
    }
  };
}

export function loginSuccess(sessionToken: string): AuthActionTypes {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      sessionToken
    }
  };
}

export function loginFailure(error: Error): AuthActionTypes {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT
  };
}
