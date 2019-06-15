import React from 'react';
import { Link } from 'react-router-dom';

import Loading from '@app/components/Loading';
import { HOME_ROUTE_PATH, LOGOUT_ROUTE_PATH } from '@app/constants';
import Logo from '@assets/images/logo.svg';

const PageLayout: React.FC<{ loading?: boolean }> = ({ children, loading }) => (
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
      <p>©{new Date().getFullYear()} Adrian Hernandez-Mendez. All rights reserved.</p>
    </footer>
  </div>
);
export default PageLayout;
