import { IEntity, IEntityAttributes } from '@app/store/entities/models';
import {
  UPDATE_ENTITY_FAILURE,
  UPDATE_ENTITY_RESET,
  UPDATE_ENTITY_START,
  UPDATE_ENTITY_SUCCESS
} from '@app/store/entities/operations/update/constants';
import { IAction, IBasicAction } from '@app/store/models';

export interface IUpdateOperationState {
  item: IEntity | null;
  attrs: IEntityAttributes | null;
  isSuccess: boolean;
  pending: boolean;
  error: Error | null;
}

export type IUpdateEntityStartAction = IAction<
  typeof UPDATE_ENTITY_START,
  {
    id: string;
    attrs: IEntityAttributes;
  }
>;
type IUpdateEntitySuccessAction = IAction<
  typeof UPDATE_ENTITY_SUCCESS,
  {
    entity: IEntity;
  }
>;
type IUpdateEntityErrorAction = IAction<typeof UPDATE_ENTITY_FAILURE, Error>;

type IUpdateEntityResetAction = IBasicAction<typeof UPDATE_ENTITY_RESET>;

export type UpdateEntityActionTypes =
  | IUpdateEntityResetAction
  | IUpdateEntityStartAction
  | IUpdateEntitySuccessAction
  | IUpdateEntityErrorAction;
