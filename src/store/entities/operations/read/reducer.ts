import { Reducer } from 'redux';

import {
  READ_ENTITY_FAILURE,
  READ_ENTITY_START,
  READ_ENTITY_SUCCESS
} from '@app/store/entities/operations/read/constants';
import {
  IReadOperationState,
  ReadEntityActionTypes
} from '@app/store/entities/operations/read/models';

const initialState: IReadOperationState = {
  item: null,
  isSuccess: false,
  pending: false,
  error: null
};

const reducer: Reducer<IReadOperationState, ReadEntityActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case READ_ENTITY_START: {
      return {
        ...state,
        pending: true
      };
    }
    case READ_ENTITY_SUCCESS: {
      const { entity } = action.payload;
      return {
        ...state,
        pending: false,
        isSuccess: true,
        item: entity
      };
    }

    case READ_ENTITY_FAILURE: {
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
