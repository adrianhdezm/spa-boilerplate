import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';

import {
  ENTITY_PREFIX_PATH,
  HOME_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  LOGOUT_ROUTE_PATH
} from '@app/constants';
import { IAppState } from '@app/store/models';
import { isAuthenticated as isAuthSelector } from '@app/store/selectors';
import ProtectedRoute from '@app/utils/ProtectedRoute';
import EntityCreateView from '@app/views/EntityCreateView';
import EntityDetailsView from '@app/views/EntityDetailsView';
import EntityEditView from '@app/views/EntityEditView';
import EntityListView from '@app/views/EntityListView';
import LoginView from '@app/views/LoginView';
import LogoutView from '@app/views/LogoutView';

interface IStateProps {
  isAuthenticated: boolean;
}

type AppProps = IStateProps;

const App: React.FC<AppProps> = ({ isAuthenticated }) => {
  useEffect(() => {
    document.title = 'Just Another Single-Page Application';
  });

  const privateRouteProps = {
    canNavigate: isAuthenticated,
    fallback: LOGIN_ROUTE_PATH
  };

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path={HOME_ROUTE_PATH}
          {...privateRouteProps}
          component={EntityListView}
          exact={true}
        />
        <ProtectedRoute
          path={LOGIN_ROUTE_PATH}
          canNavigate={!isAuthenticated}
          fallback={HOME_ROUTE_PATH}
          component={LoginView}
          exact={true}
        />
        <ProtectedRoute
          path={LOGOUT_ROUTE_PATH}
          canNavigate={isAuthenticated}
          fallback={HOME_ROUTE_PATH}
          component={LogoutView}
          exact={true}
        />
        <ProtectedRoute
          path={`${ENTITY_PREFIX_PATH}/create`}
          {...privateRouteProps}
          component={EntityCreateView}
          exact={true}
        />
        <ProtectedRoute
          path={`${ENTITY_PREFIX_PATH}/:id/edit`}
          {...privateRouteProps}
          component={EntityEditView}
          exact={true}
        />
        <ProtectedRoute
          path={`${ENTITY_PREFIX_PATH}/:id`}
          {...privateRouteProps}
          component={EntityDetailsView}
        />
      </Switch>
    </Router>
  );
};

function mapStateToProps(state: IAppState) {
  return {
    isAuthenticated: isAuthSelector(state)
  };
}

export default connect<IStateProps>(mapStateToProps)(App);
