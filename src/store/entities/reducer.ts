import { combineReducers, Reducer } from 'redux';

import { EntityActionTypes, IEntity } from '@app/store/entities/models';
import { CREATE_ENTITY_SUCCESS } from '@app/store/entities/operations/create/constants';
import createReducer from '@app/store/entities/operations/create/reducer';
import { DELETE_ENTITY_SUCCESS } from '@app/store/entities/operations/delete/constants';
import deleteReducer from '@app/store/entities/operations/delete/reducer';
import {
  LIST_ENTITIES_START,
  LIST_ENTITIES_SUCCESS
} from '@app/store/entities/operations/list/constants';
import listReducer from '@app/store/entities/operations/list/reducer';
import readReducer from '@app/store/entities/operations/read/reducer';
import { UPDATE_ENTITY_SUCCESS } from '@app/store/entities/operations/update/constants';
import updateReducer from '@app/store/entities/operations/update/reducer';

const reducer: Reducer<IEntity[], EntityActionTypes> = (state = [], action) => {
  switch (action.type) {
    case LIST_ENTITIES_START: {
      return [];
    }
    case LIST_ENTITIES_SUCCESS: {
      const { entities } = action.payload;
      return [...state, ...entities].reduce((unique, entity) => {
        if (!unique.find(({ objectId }) => objectId === entity.objectId)) {
          unique.push(entity);
        }
        return unique;
      }, []);
    }
    case CREATE_ENTITY_SUCCESS: {
      const { entity } = action.payload;
      return [...state, entity];
    }
    case UPDATE_ENTITY_SUCCESS: {
      const { entity } = action.payload;
      const idx = state.findIndex((item) => item.objectId === entity.objectId);
      return [...state.slice(0, idx), entity, ...state.slice(idx + 1)];
    }
    case DELETE_ENTITY_SUCCESS: {
      const { id } = action.payload;
      const idx = state.findIndex((item) => item.objectId === id);
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    }
    default: {
      return state;
    }
  }
};

const operations = combineReducers({
  create: createReducer,
  read: readReducer,
  update: updateReducer,
  delete: deleteReducer,
  list: listReducer
});

export default combineReducers({
  items: reducer,
  operations
});
