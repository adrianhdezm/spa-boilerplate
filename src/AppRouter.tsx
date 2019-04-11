import React from 'react';
import { HashRouter as Router, Route, RouteProps, Redirect, Switch } from 'react-router-dom';

import { HOME_ROUTE_PATH, LOGIN_ROUTE_PATH, LOGOUT_ROUTE_PATH } from '@app/constants';
import { isAuthenticated } from '@app/services/auth';

import LoginView from '@app/views/LoginView';
import LogoutView from '@app/views/LogoutView';
import EntityListView from '@app/views/EntityListView';
import EntityDetailsView from '@app/views/EntityDetailsView';
import EntityEditView from '@app/views/EntityEditView';
import EntityCreateView from '@app/views/EntityCreateView';

type ProtectedRouteProps = RouteProps & { canNavigate: () => boolean; fallback: string };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canNavigate,
  fallback,
  component,
  ...rest
}) => {
  const RouteComponent: React.ComponentType<RouteProps> = (props) =>
    canNavigate() ? (
      React.createElement(component, { ...props }, null)
    ) : (
      <Redirect to={fallback} from={props.location.pathname} />
    );

  return <Route {...rest} render={RouteComponent} />;
};

const AppRouter: React.FC<{}> = () => {
  const notAuthenticated = () => !isAuthenticated();

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
          canNavigate={notAuthenticated}
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
          path={'/create'}
          {...privateRouteProps}
          component={EntityCreateView}
          exact={true}
        />
        <ProtectedRoute
          path={'/:id/edit'}
          {...privateRouteProps}
          component={EntityEditView}
          exact={true}
        />
        <ProtectedRoute path={'/:id'} {...privateRouteProps} component={EntityDetailsView} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
