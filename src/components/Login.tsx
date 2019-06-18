import { FormikProps } from 'formik';
import React from 'react';

import { AUTH_STEP_CONFIRM_SIGNIN, AUTH_STEP_NEW_PASSWORD, AUTH_STEP_SIGNIN } from '@app/constants';
import { ILoginFormAttributes } from '@app/models';

const Login: React.FC<FormikProps<ILoginFormAttributes>> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  status
}) => {
  const FormState = {};

  FormState[AUTH_STEP_SIGNIN] = (
    <>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        name="email"
      />
      {errors.email && touched.email ? <div>{errors.email}</div> : null}
      <input
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        name="password"
      />
      {errors.password && touched.password ? <div>{errors.password}</div> : null}
      <button type="submit">Login</button>
    </>
  );

  FormState[AUTH_STEP_NEW_PASSWORD] = (
    <>
      <input
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.newPassword}
        name="newPassword"
      />
      {errors.newPassword && touched.newPassword ? <div>{errors.newPassword}</div> : null}
      <button type="submit">Change</button>
    </>
  );

  FormState[AUTH_STEP_CONFIRM_SIGNIN] = (
    <>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.code}
        name="code"
      />
      {errors.code && touched.code ? <div>{errors.code}</div> : null}
      <button type="submit">Send</button>
    </>
  );

  return <form onSubmit={handleSubmit}>{FormState[status]}</form>;
};

export default Login;
