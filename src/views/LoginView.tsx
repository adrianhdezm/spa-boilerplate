import { Formik, FormikActions } from 'formik';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import LoginPage from '@app/components/LoginPage';
import { HOME_ROUTE_PATH } from '@app/constants';
import { IFormSchema, validateValues } from '@app/services/validation';
import { IAppState } from '@app/store/models';
import { isAuthenticated as isAuthSelector } from '@app/store/selectors';
import { loginStart } from '@app/store/user/actions';
import { AuthActionTypes, IUser } from '@app/store/user/models';

interface IStateProps {
  networkError: Error;
  isAuthenticated: boolean;
}
interface IDispatchProps {
  login: (username: string, password: string) => void;
}

type LoginViewProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

const LoginView: React.FC<LoginViewProps> = ({
  history,
  location,
  login,
  networkError,
  isAuthenticated
}) => {
  const formikRef = useRef<Formik<IUser>>();

  const handleSubmit = (values: IUser, actions: FormikActions<IUser>) => {
    const { username, password } = values;
    login(username, password);
    actions.setSubmitting(false);
  };

  const initialValues: IUser = {
    password: '',
    username: ''
  };

  const schema: IFormSchema = {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true }
  };

  const validate = (values: IUser) => {
    const errors = validateValues(values, schema);
    return errors;
  };

  useEffect(() => {
    if (networkError) {
      formikRef.current.setErrors({
        username: networkError.message
      });
    }

    if (isAuthenticated) {
      const { from } = location.state || { from: { pathname: HOME_ROUTE_PATH } };
      history.push(from.pathname);
    }
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      render={LoginPage}
      ref={formikRef}
    />
  );
};

function mapStateToProps(state: IAppState) {
  const { error } = state.user;

  return {
    networkError: error,
    isAuthenticated: isAuthSelector(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<AuthActionTypes>) {
  return {
    login: (username: string, password: string) => dispatch(loginStart(username, password))
  };
}

export default connect<IStateProps, IDispatchProps, RouteComponentProps<{}>>(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
