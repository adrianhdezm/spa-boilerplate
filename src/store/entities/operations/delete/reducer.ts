import { Reducer } from 'redux';

import {
  DELETE_ENTITY_FAILURE,
  DELETE_ENTITY_RESET,
  DELETE_ENTITY_START,
  DELETE_ENTITY_SUCCESS
} from '@app/store/entities/operations/delete/constants';
import {
  DeleteEntityActionTypes,
  IDeleteOperationState
} from '@app/store/entities/operations/delete/models';

const initialState: IDeleteOperationState = {
  id: '',
  isSuccess: false,
  pending: false,
  error: null
};

const reducer: Reducer<IDeleteOperationState, DeleteEntityActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DELETE_ENTITY_RESET: {
      return {
        id: '',
        isSuccess: false,
        pending: false,
        error: null
      };
    }
    case DELETE_ENTITY_START: {
      return {
        ...state,
        pending: true
      };
    }
    case DELETE_ENTITY_SUCCESS: {
      const { id } = action.payload;
      return {
        ...state,
        id,
        pending: false,
        isSuccess: true
      };
    }

    case DELETE_ENTITY_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        error,
        pending: false,
        isSuccess: false
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
