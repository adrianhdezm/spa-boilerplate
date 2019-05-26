import { Reducer } from 'redux';

import {
  UPDATE_ENTITY_FAILURE,
  UPDATE_ENTITY_RESET,
  UPDATE_ENTITY_START,
  UPDATE_ENTITY_SUCCESS
} from '@app/store/entities/operations/update/constants';
import {
  IUpdateOperationState,
  UpdateEntityActionTypes
} from '@app/store/entities/operations/update/models';

const initialState: IUpdateOperationState = {
  item: null,
  attrs: null,
  isSuccess: false,
  pending: false,
  error: null
};

const reducer: Reducer<IUpdateOperationState, UpdateEntityActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_ENTITY_RESET: {
      return {
        item: null,
        attrs: null,
        isSuccess: false,
        pending: false,
        error: null
      };
    }
    case UPDATE_ENTITY_START: {
      const { attrs } = action.payload;
      return {
        ...state,
        pending: true,
        attrs
      };
    }
    case UPDATE_ENTITY_SUCCESS: {
      const { entity } = action.payload;
      return {
        ...state,
        pending: false,
        isSuccess: true,
        item: entity
      };
    }

    case UPDATE_ENTITY_FAILURE: {
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
