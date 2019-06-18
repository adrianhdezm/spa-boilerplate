import '@assets/reset.css';

import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '@app/App';
import config from '@app/aws-exports';
import { configureStore, history } from '@app/store/configureStore';
import Amplify from '@aws-amplify/core';

Amplify.configure(config);
const store = configureStore();

/* tslint:disable:jsx-wrap-multiline */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
