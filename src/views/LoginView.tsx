import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, FormikActions } from 'formik';
import { IUser } from '@app/models';
import { validateValues, IFormSchema } from '@app/services/validation';
import { login } from '@app/services/auth';

import LoginPage from '@ui/LoginPage';

import { HOME_ROUTE_PATH } from '@app/constants';

const LoginView: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const handleSubmit = async (values: IUser, actions: FormikActions<IUser>) => {
    const { setErrors } = actions;
    const { username, password } = values;
    try {
      const result = await login(username, password);
      if (result) {
        const { from } = location.state || { from: { pathname: HOME_ROUTE_PATH } };
        history.push(from.pathname);
      } else {
        setErrors({
          username: 'The username/password is not correct'
        });
      }
      actions.setSubmitting(false);
    } catch (error) {
      setErrors({
        username: error.message
      });
    }
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

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      render={LoginPage}
    />
  );
};

export default LoginView;
