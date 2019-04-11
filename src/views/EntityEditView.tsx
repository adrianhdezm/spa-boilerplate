import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, FormikActions } from 'formik';

import { IEntity, IEntityAttributes } from '@app/models';
import { useData } from '@app/hooks';
import { fetchEntity, updateEntity } from '@app/services/entities';
import Page from '@ui/Page';
import EntityForm from '@ui/EntityForm';

const EntityEditView: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const { data, isLoading } = useData(fetchEntity, match.params.id);

  const handleSubmit = async (
    values: IEntityAttributes,
    actions: FormikActions<IEntityAttributes>
  ) => {
    const { setErrors } = actions;
    try {
      const { objectId } = data;
      if (objectId) {
        await updateEntity(objectId, values);
      }
      actions.setSubmitting(false);
      history.push(`/${objectId}`);
    } catch (error) {
      setErrors({
        name: error.message
      });
    }
    actions.setSubmitting(false);
  };

  const mapAttributesToValues = (attrs: IEntity) => {
    if (!attrs) {
      return {};
    }
    const { objectId, createdAt, updatedAt, ...values } = attrs;
    return values;
  };

  return (
    <Page loading={isLoading || !data}>
      <Formik
        initialValues={mapAttributesToValues(data)}
        onSubmit={handleSubmit}
        render={EntityForm}
      />
    </Page>
  );
};

export default EntityEditView;
