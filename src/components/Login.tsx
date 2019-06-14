import { FormikProps } from 'formik';
import React from 'react';

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
  const loginFields =
    status && status === 'signIn' ? (
      <div>
        <input
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name="email"
        />
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
        {status && status.email ? <div>{status.email}</div> : null}
        <input
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          name="password"
        />
        {errors.password && touched.password ? <div>{errors.password}</div> : null}
        {status && status.password ? <div>{status.password}</div> : null}
      </div>
    ): null;

  const passwordChallangeFiels =
  status && status === 'completeNewPassword'? (
      <div>
        <input
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          name="newPassword"
        />
        {errors.newPassword && touched.newPassword ? <div>{errors.newPassword}</div> : null}
        {status && status.newPassword ? <div>{status.newPassword}</div> : null}
      </div>
    ) : null;

  const codeChallangeFiels =
    status && status === 'confirmSignIn' ? (
      <div>
        <input
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code}
          name="code"
        />
        {errors.code && touched.code ? <div>{errors.code}</div> : null}
        {status && status.code ? <div>{status.code}</div> : null}
      </div>
    ) : null;

  return (
    <form onSubmit={handleSubmit}>
      {loginFields}
      {passwordChallangeFiels}
      {codeChallangeFiels}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
