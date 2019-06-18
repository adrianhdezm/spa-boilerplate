import React, { useEffect } from 'react';

import Logout from '@app/components/Logout';
import Auth from '@aws-amplify/auth';

const LogoutView: React.FC<{}> = () => {
  useEffect(() => {
    Auth.signOut();
  });

  return <Logout />;
};

export default LogoutView;
