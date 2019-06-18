import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import {
  ENTITIES_BASE_PATH,
  HOME_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  LOGOUT_ROUTE_PATH,
  NOT_FOUND_ROUTE_PATH
} from '@app/constants';
import { isAuthenticated, isNotAuthenticated } from '@app/services/auth';
import ProtectedRoute from '@app/utils/ProtectedRoute';
import EntityCreateView from '@app/views/EntityCreateView';
import EntityDetailsView from '@app/views/EntityDetailsView';
import EntityListView from '@app/views/EntityListView';
import EntityUpdateView from '@app/views/EntityUpdateView';
import LoginView from '@app/views/LoginView';
import LogoutView from '@app/views/LogoutView';
import NotFoundView from '@app/views/NotFoundView';

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
          <ProtectedRoute
            key={`${ENTITIES_BASE_PATH}/create`}
            path={`${ENTITIES_BASE_PATH}/create`}
            component={EntityCreateView}
            fallback={LOGIN_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
          <ProtectedRoute
            key={`${ENTITIES_BASE_PATH}/:id/edit`}
            path={`${ENTITIES_BASE_PATH}/:id/edit`}
            component={EntityUpdateView}
            fallback={LOGIN_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
          <ProtectedRoute
            key={`${ENTITIES_BASE_PATH}/:id`}
            path={`${ENTITIES_BASE_PATH}/:id`}
            component={EntityDetailsView}
            fallback={LOGIN_ROUTE_PATH}
            canLoad={isAuthenticated}
          />
          <Route path={NOT_FOUND_ROUTE_PATH} component={NotFoundView} exact={true} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
