import { Formik, FormikActions } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Login from '@app/components/Login';
import { HOME_ROUTE_PATH } from '@app/constants';
import { ILoginFormAttributes } from '@app/models';
import { login } from '@app/services/auth';

const LoginView: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const initialValues: ILoginFormAttributes = {
    password: '',
    email: ''
  };

  const handleSubmit = async (
    values: ILoginFormAttributes,
    actions: FormikActions<ILoginFormAttributes>
  ) => {
    const { setStatus, setSubmitting } = actions;
    const { email, password } = values;
    setStatus(undefined);
    try {
      const { authenticated, error } = await login(email, password);
      if (authenticated && !error) {
        const { from } = location.state || { from: { pathname: HOME_ROUTE_PATH } };
        history.push(from.pathname);
      } else {
        const { email: emailError, password: passwordError } = error;
        setStatus({ email: emailError, password: passwordError });
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  const validate = (values: ILoginFormAttributes) => {
    return {
      ...(values.email === '' ? { email: 'Email is required' } : {}),
      ...(values.password === '' ? { password: 'Password is required' } : {})
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      render={Login}
    />
  );
};

export default LoginView;
