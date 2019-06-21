import { FormikProps } from 'formik';
import React from 'react';

import { IEntityAttributes } from '@app/store/entities/models';

const EntityForm: React.FC<FormikProps<IEntityAttributes>> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  setFieldValue
}) => {
  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('tags', event.target.value.split(','));
  };

  const mapTagsToString = (tags: string[]) => tags.join(',');

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.name} name="name" />
        {errors.name && touched.name ? <div>{errors.name}</div> : null}
      </div>
      <div>
        <label>Tags</label>
        <input
          type="text"
          onChange={handleTagsChange}
          onBlur={handleBlur}
          value={mapTagsToString(values.tags)}
          name="tags"
        />
        {errors.name && touched.name ? <div>{errors.name}</div> : null}
      </div>
      <div>
        <label>Descriptions</label>
        <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.description} name="description" />
        {errors.description && touched.description ? <div>{errors.description}</div> : null}
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default EntityForm;
