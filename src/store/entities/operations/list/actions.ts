import { IEntity } from '@app/store/entities/models';
import {
  LIST_ENTITIES_FAILURE,
  LIST_ENTITIES_START,
  LIST_ENTITIES_SUCCESS
} from '@app/store/entities/operations/list/constants';
import { ListEntitiesActionTypes } from '@app/store/entities/operations/list/models';

export function listEntitiesStart(): ListEntitiesActionTypes {
  return {
    type: LIST_ENTITIES_START
  };
}

export function listEntitiesSuccess(entities: IEntity[]): ListEntitiesActionTypes {
  return {
    type: LIST_ENTITIES_SUCCESS,
    payload: {
      entities
    }
  };
}

export function listEntitiesFailure(error: Error): ListEntitiesActionTypes {
  return {
    type: LIST_ENTITIES_FAILURE,
    payload: error
  };
}
