import { Reducer } from 'redux';

import {
  CREATE_ENTITY_FAILURE,
  CREATE_ENTITY_RESET,
  CREATE_ENTITY_START,
  CREATE_ENTITY_SUCCESS
} from '@app/store/entities/operations/create/constants';
import {
  CreateEntityActionTypes,
  ICreateOperationState
} from '@app/store/entities/operations/create/models';

const initialState: ICreateOperationState = {
  item: null,
  isSuccess: false,
  pending: false,
  error: null
};

const reducer: Reducer<ICreateOperationState, CreateEntityActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_ENTITY_RESET: {
      return {
        item: null,
        isSuccess: false,
        pending: false,
        error: null
      };
    }
    case CREATE_ENTITY_START: {
      return {
        ...state,
        pending: true
      };
    }
    case CREATE_ENTITY_SUCCESS: {
      const { entity } = action.payload;
      return {
        ...state,
        pending: false,
        isSuccess: true,
        item: entity
      };
    }

    case CREATE_ENTITY_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        pending: false,
        isSuccess: false,
        error
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
