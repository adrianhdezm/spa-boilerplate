import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import Loading from '@ui/Loading';

import { HOME_ROUTE_PATH, LOGOUT_ROUTE_PATH } from '@app/constants';

const Page: React.FC<{ loading?: boolean }> = ({ children, loading }) => (
  <div>
    <header>
      <Link to={HOME_ROUTE_PATH}>
        <Logo />
      </Link>
      <h1>SPA Project</h1>
      <nav>
        <Link to={LOGOUT_ROUTE_PATH}>Logout</Link>
      </nav>
    </header>
    <div>{loading ? <Loading /> : children}</div>
    <footer>
      <p>© {new Date().getFullYear()} Adrian Hernandez-Mendez. All rights reserved.</p>
    </footer>
  </div>
);

export default Page;
