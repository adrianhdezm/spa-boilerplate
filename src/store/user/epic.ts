import { combineEpics, Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { login } from '@app/services/auth';
import { IAppState } from '@app/store/models';
import { loginFailure, loginSuccess } from '@app/store/user/actions';
import { LOGIN_START } from '@app/store/user/constants';
import { AuthActionTypes, ILoginStartAction } from '@app/store/user/models';

const authEpic: Epic<AuthActionTypes, AuthActionTypes, IAppState> = (action$) =>
  action$.pipe(
    ofType(LOGIN_START),
    mergeMap((action: ILoginStartAction) => {
      const { username, password } = action.payload;
      return from(login(username, password)).pipe(
        map((sessionToken) => loginSuccess(sessionToken)),
        catchError((error) => of(loginFailure(error)))
      );
    })
  );

export default combineEpics(authEpic);
