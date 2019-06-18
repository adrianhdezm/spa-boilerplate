import { combineReducers } from 'redux';
import { on, reducer } from 'ts-action';

import {
  createEntityFailure,
  createEntityReset,
  createEntityStart,
  createEntitySuccess,
  deleteEntityFailure,
  deleteEntityReset,
  deleteEntityStart,
  deleteEntitySuccess,
  listEntitiesFailure,
  listEntitiesReset,
  listEntitiesStart,
  listEntitiesSuccess,
  readEntityFailure,
  readEntityReset,
  readEntityStart,
  readEntitySuccess,
  updateEntityFailure,
  updateEntityReset,
  updateEntityStart,
  updateEntitySuccess
} from '@app/store/entities/actions';
import { IEntity, IMutationOperationState, IQueryOperationState } from '@app/store/entities/models';

const mutationOperationReducer = reducer<IMutationOperationState>(
  {
    item: null,
    completed: false,
    pending: false,
    error: null
  },
  on(createEntityStart, updateEntityStart, deleteEntityStart, (state) => ({ ...state, pending: true })),
  on(createEntitySuccess, updateEntitySuccess, deleteEntitySuccess, (state, { payload }) => ({
    ...state,
    pending: false,
    completed: true,
    item: payload.entity
  })),
  on(createEntityFailure, updateEntityFailure, deleteEntityFailure, (state, { payload }) => ({
    ...state,
    pending: false,
    completed: true,
    error: payload.error
  })),
  on(createEntityReset, updateEntityReset, deleteEntityReset, (state) => ({
    item: null,
    completed: false,
    pending: false,
    error: null
  }))
);

const queryOperationReducer = reducer<IQueryOperationState>(
  {
    results: null,
    completed: false,
    pending: false,
    error: null
  },
  on(readEntityStart, listEntitiesStart, (state) => ({ ...state, pending: true })),
  on(readEntitySuccess, (state, { payload }) => ({
    ...state,
    pending: false,
    completed: true,
    results: payload.entity
  })),
  on(listEntitiesSuccess, (state, { payload }) => ({
    ...state,
    pending: false,
    completed: true,
    results: payload.entities
  })),
  on(readEntityFailure, listEntitiesFailure, (state, { payload }) => ({
    ...state,
    pending: false,
    completed: true,
    error: payload.error
  })),
  on(readEntityReset, listEntitiesReset, (state) => ({
    results: null,
    completed: false,
    pending: false,
    error: null
  }))
);

const mainReducer = reducer<IEntity[]>(
  [],
  on(listEntitiesStart, (state) => []),
  on(listEntitiesSuccess, (state, { payload }) => payload.entities),
  on(createEntitySuccess, (state, { payload }) => [...state, payload.entity]),
  on(updateEntitySuccess, (state, { payload }) => {
    const idx = state.findIndex((item) => item.id === payload.entity.id);
    return [...state.slice(0, idx), payload.entity, ...state.slice(idx + 1)];
  }),
  on(deleteEntitySuccess, (state, { payload }) => {
    const idx = state.findIndex((item) => item.id === payload.entity.id);
    return [...state.slice(0, idx), ...state.slice(idx + 1)];
  })
);

const operations = combineReducers({
  query: queryOperationReducer,
  mutation: mutationOperationReducer
});

export default combineReducers({
  items: mainReducer,
  operations
});
