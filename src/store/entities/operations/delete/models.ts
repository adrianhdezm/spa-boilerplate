import {
  DELETE_ENTITY_FAILURE,
  DELETE_ENTITY_RESET,
  DELETE_ENTITY_START,
  DELETE_ENTITY_SUCCESS
} from '@app/store/entities/operations/delete/constants';
import { IAction, IBasicAction } from '@app/store/models';

export interface IDeleteOperationState {
  id: string;
  isSuccess: boolean;
  pending: boolean;
  error: Error | null;
}

export type IDeleteEntityStartAction = IAction<
  typeof DELETE_ENTITY_START,
  {
    id: string;
  }
>;
type IDeleteEntitySuccessAction = IAction<typeof DELETE_ENTITY_SUCCESS, { id: string }>;
type IDeleteEntityErrorAction = IAction<typeof DELETE_ENTITY_FAILURE, Error>;

type IDeleteEntityResetAction = IBasicAction<typeof DELETE_ENTITY_RESET>;

export type DeleteEntityActionTypes =
  | IDeleteEntityResetAction
  | IDeleteEntityStartAction
  | IDeleteEntitySuccessAction
  | IDeleteEntityErrorAction;
