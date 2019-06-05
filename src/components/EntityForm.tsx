import { FormikProps } from 'formik';
import React from 'react';

import { IEntityAttributes } from '@app/store/entities/models';

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
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        name="description"
      />
      {errors.description && touched.description ? <div>{errors.description}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntityForm;
