import { IEntity } from '@app/store/entities/models';
import {
  READ_ENTITY_FAILURE,
  READ_ENTITY_START,
  READ_ENTITY_SUCCESS
} from '@app/store/entities/operations/read/constants';
import { IAction } from '@app/store/models';

export interface IReadOperationState {
  item: IEntity | null;
  isSuccess: boolean;
  pending: boolean;
  error: Error | null;
}

export type IReadEntityStartAction = IAction<typeof READ_ENTITY_START, { id: string }>;
type IReadEntitySuccessAction = IAction<
  typeof READ_ENTITY_SUCCESS,
  {
    entity: IEntity;
  }
>;
type IReadEntityErrorAction = IAction<typeof READ_ENTITY_FAILURE, Error>;

export type ReadEntityActionTypes =
  | IReadEntityStartAction
  | IReadEntitySuccessAction
  | IReadEntityErrorAction;
