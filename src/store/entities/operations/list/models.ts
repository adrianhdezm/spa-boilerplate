import { IEntity } from '@app/store/entities/models';
import {
  LIST_ENTITIES_FAILURE,
  LIST_ENTITIES_START,
  LIST_ENTITIES_SUCCESS
} from '@app/store/entities/operations/list/constants';
import { IAction, IBasicAction } from '@app/store/models';

export interface IListOperationState {
  items: IEntity[] | null;
  isSuccess: boolean;
  pending: boolean;
  error: Error | null;
}

export type IListEntitiesStartAction = IBasicAction<typeof LIST_ENTITIES_START>;
type IListEntitiesSuccessAction = IAction<typeof LIST_ENTITIES_SUCCESS, { entities: IEntity[] }>;
type IListEntitiesErrorAction = IAction<typeof LIST_ENTITIES_FAILURE, Error>;

export type ListEntitiesActionTypes =
  | IListEntitiesStartAction
  | IListEntitiesSuccessAction
  | IListEntitiesErrorAction;
