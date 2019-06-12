import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { HOME_ROUTE_PATH, LOGIN_ROUTE_PATH, LOGOUT_ROUTE_PATH } from '@app/constants';
import EntityListView from '@app/views/EntityListView';
import LoginView from '@app/views/LoginView';
import LogoutView from '@app/views/LogoutView';
import NotFoundView from '@app/views/NotFoundView';

const App: React.FC<{}> = () => {
  useEffect(() => {
    document.title = 'Just Another Single-Page Application';
  });

  return (
    <>
      <Router>
        <Switch>
          <Route path={HOME_ROUTE_PATH} component={EntityListView} exact={true} />
          <Route path={LOGIN_ROUTE_PATH} component={LoginView} exact={true} />
          <Route path={LOGOUT_ROUTE_PATH} component={LogoutView} exact={true} />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
