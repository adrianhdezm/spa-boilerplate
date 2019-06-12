import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & { canNavigate: boolean; fallback: string };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canNavigate,
  fallback,
  component,
  ...rest
}) => {
  const RouteComponent: React.ComponentType<RouteProps> = (props) => {
    const from = props.location && props.location.pathname ? { from: props.location.pathname } : {};

    return canNavigate ? (
      React.createElement(component as React.ComponentType<RouteProps>, { ...props }, null)
    ) : (
      <Redirect to={fallback} {...from} />
    );
  };

  return <Route {...rest} render={RouteComponent} />;
};

export default ProtectedRoute;
