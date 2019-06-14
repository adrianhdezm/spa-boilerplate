import { Formik, FormikActions } from 'formik';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Login from '@app/components/Login';
import { HOME_ROUTE_PATH } from '@app/constants';
import { ILoginFormAttributes } from '@app/models';
import Auth, { CognitoUser } from '@aws-amplify/auth';

const FORM_STATUS = ['signIn', 'confirmSignIn', 'completeNewPassword', 'error'];

const LoginView: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const [formStatus, setFormStatus] = useState<string>('signIn');
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);

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

  const handleSubmit = async (
    values: ILoginFormAttributes,
    actions: FormikActions<ILoginFormAttributes>
  ) => {
    const { setStatus, setSubmitting } = actions;
    const { email, password, newPassword, code } = values;

    try {
      if (formStatus === 'signIn') {
        const user = await Auth.signIn(email, password);
        setCurrentUser(user);

        if (user.challengeName === 'SOFTWARE_TOKEN_MFA') {
          setFormStatus('confirmSignIn');
          setStatus('confirmSignIn');
        }

        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          setFormStatus('completeNewPassword');
          setStatus('completeNewPassword');
        }

        if (user && !user.challengeName) {
          redirect();
        }
      }

      if (currentUser && formStatus === 'confirmSignIn') {
        const loggedUser = await Auth.confirmSignIn(
          currentUser, // Return object from Auth.signIn()
          code, // Confirmation code
          'SOFTWARE_TOKEN_MFA' // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
        );
        if (loggedUser && !loggedUser.challengeName) {
          redirect();
        }
      }
      if (currentUser && formStatus === 'completeNewPassword') {
        const loggedUser = await Auth.completeNewPassword(
          currentUser, // the Cognito User Object
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
        setStatus({ error: { password: 'Incorrect password is provided' } });
      } else if (error.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        setStatus({ error: { email: 'Supplied username does not exist' } });
      } else {
        console.log(error);
      }

      const { email: emailError, password: passwordError } = error;
      setStatus({ email: emailError, password: passwordError });
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
      initialStatus={formStatus}
      validate={validate}
      onSubmit={handleSubmit}
      render={Login}
    />
  );
};

export default LoginView;
