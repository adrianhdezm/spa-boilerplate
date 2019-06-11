import { IEntity, IEntityAttributes } from '@app/store/entities/models';
import {
  CREATE_ENTITY_FAILURE,
  CREATE_ENTITY_RESET,
  CREATE_ENTITY_START,
  CREATE_ENTITY_SUCCESS
} from '@app/store/entities/operations/create/constants';
import { CreateEntityActionTypes } from '@app/store/entities/operations/create/models';

export function createEntityStart(attrs: IEntityAttributes): CreateEntityActionTypes {
  return {
    type: CREATE_ENTITY_START,
    payload: {
      attrs
    }
  };
}

export function createEntitySuccess(entity: IEntity): CreateEntityActionTypes {
  return {
    type: CREATE_ENTITY_SUCCESS,
    payload: {
      entity
    }
  };
}

export function createEntityFailure(error: Error): CreateEntityActionTypes {
  return {
    type: CREATE_ENTITY_FAILURE,
    payload: error
  };
}

export function createEntityReset(): CreateEntityActionTypes {
  return {
    type: CREATE_ENTITY_RESET
  };
}
