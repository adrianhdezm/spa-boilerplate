import { IEntity, IEntityAttributes } from '@app/store/entities/models';
import {
  UPDATE_ENTITY_FAILURE,
  UPDATE_ENTITY_RESET,
  UPDATE_ENTITY_START,
  UPDATE_ENTITY_SUCCESS
} from '@app/store/entities/operations/update/constants';
import { UpdateEntityActionTypes } from '@app/store/entities/operations/update/models';

export function updateEntityStart(id: string, attrs: IEntityAttributes): UpdateEntityActionTypes {
  return {
    type: UPDATE_ENTITY_START,
    payload: {
      id,
      attrs
    }
  };
}

export function updateEntitySuccess(entity: IEntity): UpdateEntityActionTypes {
  return {
    type: UPDATE_ENTITY_SUCCESS,
    payload: {
      entity
    }
  };
}

export function updateEntityFailure(error: Error): UpdateEntityActionTypes {
  return {
    type: UPDATE_ENTITY_FAILURE,
    payload: error
  };
}

export function updateEntityReset(): UpdateEntityActionTypes {
  return {
    type: UPDATE_ENTITY_RESET
  };
}
