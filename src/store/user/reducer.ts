import { Reducer } from 'redux';

import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '@app/store/user/constants';
import { AuthActionTypes, IUserState } from '@app/store/user/models';

const initialState: IUserState = {
  username: '',
  sessionToken: null,
  isValidatingCredentials: false,
  error: null
};

const reducer: Reducer<IUserState, AuthActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      const { username } = action.payload;
      return {
        ...state,
        username,
        isValidatingCredentials: true
      };
    }
    case LOGIN_SUCCESS: {
      const { sessionToken } = action.payload;
      return {
        ...state,
        sessionToken,
        isValidatingCredentials: false
      };
    }
    case LOGIN_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        username: '',
        isValidatingCredentials: false,
        error
      };
    }
    case LOGOUT: {
      return {
        ...state,
        username: '',
        sessionToken: null
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
