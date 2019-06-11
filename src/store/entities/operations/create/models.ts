import { IEntity, IEntityAttributes } from '@app/store/entities/models';
import {
  CREATE_ENTITY_FAILURE,
  CREATE_ENTITY_RESET,
  CREATE_ENTITY_START,
  CREATE_ENTITY_SUCCESS
} from '@app/store/entities/operations/create/constants';
import { IAction, IBasicAction } from '@app/store/models';

export interface ICreateOperationState {
  item: IEntity | null;
  isSuccess: boolean;
  pending: boolean;
  error: Error | null;
}

export type ICreateEntityStartAction = IAction<
  typeof CREATE_ENTITY_START,
  { attrs: IEntityAttributes }
>;
type ICreateEntitySuccessAction = IAction<
  typeof CREATE_ENTITY_SUCCESS,
  {
    entity: IEntity;
  }
>;
type ICreateEntityErrorAction = IAction<typeof CREATE_ENTITY_FAILURE, Error>;

type ICreateEntityResetAction = IBasicAction<typeof CREATE_ENTITY_RESET>;

export type CreateEntityActionTypes =
  | ICreateEntityResetAction
  | ICreateEntityStartAction
  | ICreateEntitySuccessAction
  | ICreateEntityErrorAction;
