import '@assets/reset.css';

import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '@app/App';
import { loadState, saveState } from '@app/services/localStorare';
import { configureStore, history } from '@app/store/configureStore';

const persistedState = loadState();

const store = configureStore(persistedState);
store.subscribe(() => {
  const { user } = store.getState();
  saveState({ user });
});

/* tslint:disable:jsx-wrap-multiline */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
