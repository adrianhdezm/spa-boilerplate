import { Formik, FormikActions } from 'formik';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Login from '@app/components/Login';
import { AUTH_STEP_CONFIRM_SIGNIN, AUTH_STEP_NEW_PASSWORD, AUTH_STEP_SIGNIN, HOME_ROUTE_PATH } from '@app/constants';
import { ILoginFormAttributes, ILoginFormState } from '@app/store/models';
import Auth from '@aws-amplify/auth';

const LoginView: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const [authState, setAuthState] = useState<ILoginFormState>({
    step: AUTH_STEP_SIGNIN,
    user: null
  });

  const initialValues: ILoginFormAttributes = {
    password: '',
    email: '',
    newPassword: '',
    code: ''
  };

  const redirect = () => {
    const { from } = location.state || { from: { pathname: HOME_ROUTE_PATH } };
    history.push(from.pathname);
  };

  const handleSubmit = async (values: ILoginFormAttributes, actions: FormikActions<ILoginFormAttributes>) => {
    const { setStatus, setErrors, setSubmitting } = actions;
    const { email, password, newPassword, code } = values;

    try {
      const { step, user } = authState;
      if (step === AUTH_STEP_SIGNIN) {
        const loggedUser = await Auth.signIn(email, password);

        if (loggedUser.challengeName === 'SOFTWARE_TOKEN_MFA') {
          setAuthState({ step: AUTH_STEP_CONFIRM_SIGNIN, user: loggedUser });
          setStatus(AUTH_STEP_CONFIRM_SIGNIN);
        }

        if (loggedUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
          setAuthState({ step: AUTH_STEP_NEW_PASSWORD, user: loggedUser });
          setStatus(AUTH_STEP_NEW_PASSWORD);
        }

        if (loggedUser && !loggedUser.challengeName) {
          redirect();
        }
      }

      if (user && step === AUTH_STEP_CONFIRM_SIGNIN) {
        const loggedUser = await Auth.confirmSignIn(
          user, // Return object from Auth.signIn()
          code, // Confirmation code
          'SOFTWARE_TOKEN_MFA' // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
        );
        if (loggedUser && !loggedUser.challengeName) {
          redirect();
        }
      }
      if (user && step === AUTH_STEP_NEW_PASSWORD) {
        const loggedUser = await Auth.completeNewPassword(
          user, // the Cognito User Object
          newPassword, // the new password
          {
            email
          }
        );
        if (loggedUser && !loggedUser.challengeName) {
          redirect();
        }
      }
    } catch (error) {
      if (error.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
        setErrors({ password: 'Incorrect password is provided' });
      } else if (error.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        setErrors({ email: 'Supplied username does not exist' });
      } else if (error === 'Password cannot be empty') {
        setErrors({ newPassword: 'New password cannot be empty' });
      } else {
        console.log(error);
      }
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
      initialStatus={AUTH_STEP_SIGNIN}
      validate={validate}
      onSubmit={handleSubmit}
      render={Login}
    />
  );
};

export default LoginView;
