import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & { canLoad: () => Promise<boolean>; fallback: string };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canLoad,
  fallback,
  location,
  component,
  ...rest
}) => {
  const [isAllowed, setIsAllowed] = useState<boolean>();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const isAllowedValue = await canLoad();
        if (mounted) {
          setIsAllowed(isAllowedValue);
        }
      } catch (e) {
        if (mounted) {
          setIsAllowed(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);


  if (isAllowed === undefined) {
    return <Route render={undefined} />;
  }
  const from = location && location.pathname ? { from: location.pathname } : {};
  return isAllowed ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to={fallback} {...from} />
  );
};

export default ProtectedRoute;
