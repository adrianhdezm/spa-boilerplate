import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import LogoutPage from '@app/components/LogoutPage';
import { logout as logoutAction } from '@app/store/user/actions';
import { AuthActionTypes } from '@app/store/user/models';

interface IDispatchProps {
  logout: () => void;
}

type LogoutViewProps = RouteComponentProps<{}> & IDispatchProps;

const LogoutView: React.FC<LogoutViewProps> = ({ logout }) => {
  useEffect(() => {
    logout();
  });

  return <LogoutPage />;
};

function mapDispatchToProps(dispatch: Dispatch<AuthActionTypes>) {
  return {
    logout: () => dispatch(logoutAction())
  };
}

export default connect<{}, IDispatchProps, RouteComponentProps<{}>>(
  null,
  mapDispatchToProps
)(LogoutView);
