import { Reducer } from 'redux';

import {
  LIST_ENTITIES_FAILURE,
  LIST_ENTITIES_START,
  LIST_ENTITIES_SUCCESS
} from '@app/store/entities/operations/list/constants';
import {
  IListOperationState,
  ListEntitiesActionTypes
} from '@app/store/entities/operations/list/models';

const initialState: IListOperationState = {
  items: null,
  isSuccess: false,
  pending: false,
  error: null
};

const reducer: Reducer<IListOperationState, ListEntitiesActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LIST_ENTITIES_START: {
      return {
        ...state,
        pending: true
      };
    }
    case LIST_ENTITIES_SUCCESS: {
      const { entities } = action.payload;
      return {
        ...state,
        pending: false,
        isSuccess: true,
        items: entities
      };
    }

    case LIST_ENTITIES_FAILURE: {
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
