import {
  DELETE_ENTITY_FAILURE,
  DELETE_ENTITY_RESET,
  DELETE_ENTITY_START,
  DELETE_ENTITY_SUCCESS
} from '@app/store/entities/operations/delete/constants';
import { DeleteEntityActionTypes } from '@app/store/entities/operations/delete/models';

export function deleteEntityStart(id: string): DeleteEntityActionTypes {
  return {
    type: DELETE_ENTITY_START,
    payload: {
      id
    }
  };
}

export function deleteEntitySuccess(id: string): DeleteEntityActionTypes {
  return {
    type: DELETE_ENTITY_SUCCESS,
    payload: {
      id
    }
  };
}

export function deleteEntityFailure(error: Error): DeleteEntityActionTypes {
  return {
    type: DELETE_ENTITY_FAILURE,
    payload: error
  };
}

export function deleteEntityReset(): DeleteEntityActionTypes {
  return {
    type: DELETE_ENTITY_RESET
  };
}
