import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, FormikActions } from 'formik';

import { createEntity } from '@app/services/entities';
import { IEntity, IEntityAttributes } from '@app/models';
import Page from '@ui/Page';
import EntityForm from '@ui/EntityForm';

const EntityCreateView: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const handleSubmit = async (
    values: IEntityAttributes,
    actions: FormikActions<IEntityAttributes>
  ) => {
    const { setErrors } = actions;
    try {
      const entity: IEntity = await createEntity(values);
      history.push(`/${entity.objectId}`);
      actions.setSubmitting(false);
    } catch (error) {
      setErrors({
        name: error.message
      });
    }
    actions.setSubmitting(false);
  };

  const initialValues: IEntityAttributes = {
    name: ''
  };

  return (
    <Page>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} render={EntityForm} />
    </Page>
  );
};

export default EntityCreateView;
