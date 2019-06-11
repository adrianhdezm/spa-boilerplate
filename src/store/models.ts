import { IEntitiesState } from '@app/store/entities/models';
import { IUserState } from '@app/store/user/models';

export interface IAppState {
  entities: IEntitiesState;
  user: IUserState;
}

export interface IBasicAction<T> {
  type: T;
}

export interface IAction<T, P> extends IBasicAction<T> {
  payload: P;
}
