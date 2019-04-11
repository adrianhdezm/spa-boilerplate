import React from 'react';
import { FormikProps } from 'formik';
import { IUser } from '@app/models';

const Login: React.FC<FormikProps<IUser>> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
        name="username"
      />
      {errors.username && touched.username ? <div>{errors.username}</div> : null}
      <input
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        name="password"
      />
      {errors.password && touched.password ? <div>{errors.password}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
