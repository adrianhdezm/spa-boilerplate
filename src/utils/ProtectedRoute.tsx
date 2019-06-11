import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & { canNavigate: boolean; fallback: string };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canNavigate,
  fallback,
  component,
  ...rest
}) => {
  const RouteComponent: React.ComponentType<RouteProps> = (props) =>
    canNavigate ? (
      React.createElement(component, { ...props }, null)
    ) : (
      <Redirect to={fallback} from={props.location.pathname} />
    );

  return <Route {...rest} render={RouteComponent} />;
};

export default ProtectedRoute;
