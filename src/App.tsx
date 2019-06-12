import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { HOME_ROUTE_PATH, LOGIN_ROUTE_PATH, LOGOUT_ROUTE_PATH } from '@app/constants';
import { currentAuthenticatedUser } from '@app/services/auth';
import ProtectedRoute from '@app/utils/ProtectedRoute';
import EntityListView from '@app/views/EntityListView';
import LoginView from '@app/views/LoginView';
import LogoutView from '@app/views/LogoutView';
import NotFoundView from '@app/views/NotFoundView';

const App: React.FC<{}> = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Just Another Single-Page Application';
    (async () => {
      try {
        const user = await currentAuthenticatedUser();
        if (user) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (e) {
        setIsUserLoggedIn(false);
      }
    })();
  });

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute
            path={HOME_ROUTE_PATH}
            canNavigate={isUserLoggedIn}
            fallback={LOGIN_ROUTE_PATH}
            component={EntityListView}
            exact={true}
          />
          <ProtectedRoute
            path={LOGIN_ROUTE_PATH}
            canNavigate={!isUserLoggedIn}
            fallback={HOME_ROUTE_PATH}
            component={LoginView}
            exact={true}
          />
          <ProtectedRoute
            path={LOGOUT_ROUTE_PATH}
            canNavigate={isUserLoggedIn}
            fallback={HOME_ROUTE_PATH}
            component={LogoutView}
            exact={true}
          />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
