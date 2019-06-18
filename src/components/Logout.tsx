import React from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE_PATH } from '@app/constants';

const Logout: React.FC<{}> = () => (
  <>
    <p>You have successfully logged out!</p>
    <Link to={LOGIN_ROUTE_PATH}>Login again</Link>
  </>
);

export default Logout;
