import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import {
  HOME_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  LOGOUT_ROUTE_PATH,
  NOT_FOUND_PATH
} from '@app/constants';
import { isAuthenticated, isNotAuthenticated } from '@app/services/auth';
import ProtectedRoute from '@app/utils/ProtectedRoute';
import EntityListView from '@app/views/EntityListView';
import LoginView from '@app/views/LoginView';
import LogoutView from '@app/views/LogoutView';
import NotFoundView from '@app/views/NotFoundView';

import EntityCreateView from './views/EntityCreateView';
import EntityDetailsView from './views/EntityDetailsView';

const App: React.FC<{}> = () => {
  useEffect(() => {
    document.title = 'Just Another Single-Page Application';
  });

  // The key property is important to diferenciate the changes in routes
  // https://reactjs.org/docs/lists-and-keys.html
  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute
            key={HOME_ROUTE_PATH}
            path={HOME_ROUTE_PATH}
            component={EntityListView}
            exact={true}
            fallback={LOGIN_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
          <ProtectedRoute
            key={LOGIN_ROUTE_PATH}
            path={LOGIN_ROUTE_PATH}
            component={LoginView}
            exact={true}
            fallback={HOME_ROUTE_PATH}
            canLoad={isNotAuthenticated}
          />
          <ProtectedRoute
            key={LOGOUT_ROUTE_PATH}
            path={LOGOUT_ROUTE_PATH}
            component={LogoutView}
            exact={true}
            fallback={HOME_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
          <Route path={NOT_FOUND_PATH} component={NotFoundView} exact={true} />
          <ProtectedRoute
            key={`${HOME_ROUTE_PATH}create`}
            path={`${HOME_ROUTE_PATH}create`}
            component={EntityCreateView}
            fallback={LOGIN_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
          <ProtectedRoute
            key={`${HOME_ROUTE_PATH}:id`}
            path={`${HOME_ROUTE_PATH}:id`}
            component={EntityDetailsView}
            fallback={LOGIN_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
