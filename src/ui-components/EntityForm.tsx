import React from 'react';
import { FormikProps } from 'formik';

import { IEntityAttributes } from '@app/models';

const EntityForm: React.FC<FormikProps<IEntityAttributes>> = ({
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
        value={values.name}
        name="name"
      />
      {errors.name && touched.name ? <div>{errors.name}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntityForm;
