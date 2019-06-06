import { Reducer } from 'redux';

import {
  LIST_ENTITIES_FAILURE,
  LIST_ENTITIES_START,
  LIST_ENTITIES_SUCCESS,
  LIST_MORE_ENTITIES
} from '@app/store/entities/operations/list/constants';
import {
  IListOperationState,
  ListEntitiesActionTypes
} from '@app/store/entities/operations/list/models';

const initialState: IListOperationState = {
  items: [],
  pageLimit: 20,
  pageCursor: 0,
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
        pending: true,
        pageCursor: 0,
        items: []
      };
    }
    case LIST_MORE_ENTITIES: {
      return {
        ...state,
        pending: true
      };
    }
    case LIST_ENTITIES_SUCCESS: {
      const { entities } = action.payload;
      const ids = entities.map((entity) => entity.objectId);

      const items = [...ids, ...state.items].reduce((unique, objectId) => {
        if (!unique.find((id) => id === objectId)) {
          unique.push(objectId);
        }
        return unique;
      }, []);

      return {
        ...state,
        pending: false,
        isSuccess: true,
        items,
        pageCursor: state.pageCursor + ids.length
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
