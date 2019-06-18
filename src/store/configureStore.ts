import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import entitiesEpic from '@app/store/entities/epic';
import entitiesReducer from '@app/store/entities/reducer';
import { IAppState } from '@app/store/models';

export const history = createBrowserHistory();
const routerReducer = connectRouter(history);

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  entities: entitiesReducer,
  router: routerReducer
});

const rootEpic = combineEpics(entitiesEpic);

const middlewares = [epicMiddleware, routerMiddleware(history)];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export function configureStore(preloadedState?: IAppState) {
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  epicMiddleware.run(rootEpic);
  return store;
}
