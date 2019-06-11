import { IAction, IBasicAction } from '@app/store/models';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '@app/store/user/constants';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserState {
  username: string;
  sessionToken: string;
  isValidatingCredentials: boolean;
  error: Error;
}

export type ILoginStartAction = IAction<typeof LOGIN_START, { username: string; password: string }>;
type ILoginSuccessAction = IAction<typeof LOGIN_SUCCESS, { sessionToken: string }>;
type ILoginErrorAction = IAction<typeof LOGIN_FAILURE, Error>;
type ILogout = IBasicAction<typeof LOGOUT>;

export type AuthActionTypes = ILoginStartAction | ILoginSuccessAction | ILoginErrorAction | ILogout;
