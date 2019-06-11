import { IEntity } from '@app/store/entities/models';
import {
  READ_ENTITY_FAILURE,
  READ_ENTITY_START,
  READ_ENTITY_SUCCESS
} from '@app/store/entities/operations/read/constants';
import { ReadEntityActionTypes } from '@app/store/entities/operations/read/models';

export function readEntityStart(id: string): ReadEntityActionTypes {
  return {
    type: READ_ENTITY_START,
    payload: {
      id
    }
  };
}

export function readEntitySuccess(entity: IEntity): ReadEntityActionTypes {
  return {
    type: READ_ENTITY_SUCCESS,
    payload: {
      entity
    }
  };
}

export function readEntityFailure(error: Error): ReadEntityActionTypes {
  return {
    type: READ_ENTITY_FAILURE,
    payload: error
  };
}
