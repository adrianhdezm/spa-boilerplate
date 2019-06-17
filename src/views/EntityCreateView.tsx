import { Formik, FormikActions } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import EntityForm from '@app/components/EntityForm';
import PageLayout from '@app/components/PageLayout';
import { ENTITIES_BASE_PATH } from '@app/constants';
import { IEntityAttributes } from '@app/models';
import { createEntity } from '@app/services/api/graphql/mutations';
import { CreateEntityMutation } from '@app/services/api/models';
import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

const EntityCreateView: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const handleSubmit = async (
    values: IEntityAttributes,
    actions: FormikActions<IEntityAttributes>
  ) => {
    try {
      const { query, variables } = graphqlOperation(createEntity, { input: values });
      const hasValidMutation = query && API.getGraphqlOperationType(query) === 'mutation';
      if (hasValidMutation) {
        const response = await API.graphql({ query, variables });
        const { errors, data } = response as GraphQLResult;
        const entity = (data as CreateEntityMutation).createEntity;
        if (entity) {
          history.push(`${ENTITIES_BASE_PATH}/${entity.id}`);
        }
        if (errors && errors.length > 0) {
          throw new Error('Response Error');
        }
      }
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  const initialValues: IEntityAttributes = {
    name: '',
    description: ''
  };

  return (
    <PageLayout>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} render={EntityForm} />
    </PageLayout>
  );
};

export default EntityCreateView;
