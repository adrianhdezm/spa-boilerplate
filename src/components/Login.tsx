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
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
