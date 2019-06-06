import { IEntity } from '@app/store/entities/models';
import {
  LIST_ENTITIES_FAILURE,
  LIST_ENTITIES_START,
  LIST_ENTITIES_SUCCESS,
  LIST_MORE_ENTITIES
} from '@app/store/entities/operations/list/constants';
import { IAction, IBasicAction } from '@app/store/models';

export interface IListOperationState {
  items: string[];
  isSuccess: boolean;
  pending: boolean;
  error: Error | null;
  pageCursor: number;
  pageLimit: number;
}

export type IListEntitiesStartAction = IBasicAction<typeof LIST_ENTITIES_START>;
export type IListMoreEntitiesAction = IBasicAction<typeof LIST_MORE_ENTITIES>;
type IListEntitiesSuccessAction = IAction<typeof LIST_ENTITIES_SUCCESS, { entities: IEntity[] }>;
type IListEntitiesErrorAction = IAction<typeof LIST_ENTITIES_FAILURE, Error>;

export type ListEntitiesActionTypes =
  | IListEntitiesStartAction
  | IListEntitiesSuccessAction
  | IListEntitiesErrorAction
  | IListMoreEntitiesAction;
