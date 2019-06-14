import React, { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { LOGIN_ROUTE_PATH } from '@app/constants';
import Auth, { CognitoUser } from '@aws-amplify/auth';

const PrivateRoute: React.FC<RouteProps> = ({ location, component, ...rest }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isAfterSetUser, setIsAfterSetUser] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          // Optional, By default is false.
          // If set to true, this call will send a request to Cognito to get the latest user data
          bypassCache: false
        });
        if (mounted) {
          setUser(currentUser);
          setIsAfterSetUser(true);
        }
      } catch (e) {
        if (mounted) {
          setUser(null);
          setIsAfterSetUser(true);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);
  if (isAfterSetUser) {
    const from = location && location.pathname ? { from: location.pathname } : {};
    return user ? (
      <Route {...rest} component={component} />
    ) : (
      <Redirect to={LOGIN_ROUTE_PATH} {...from} />
    );
  }
  return <Route render={undefined} />;
};

export default PrivateRoute;
