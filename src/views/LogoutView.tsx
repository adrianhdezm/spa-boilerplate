import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { logout } from '@app/services/auth';
import LogoutPage from '@ui/LogoutPage';

const LogoutView: React.FC<RouteComponentProps<{}>> = () => {
  useEffect(() => {
    logout();
  });

  return <LogoutPage />;
};

export default LogoutView;
