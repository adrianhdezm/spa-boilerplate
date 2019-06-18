import { Formik, FormikActions } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import EntityForm from '@app/components/EntityForm';
import PageLayout from '@app/components/PageLayout';
import { ENTITIES_BASE_PATH } from '@app/constants';
import { IEntity, IEntityAttributes } from '@app/models';
import { updateEntity } from '@app/services/api/graphql/mutations';
import { getEntity } from '@app/services/api/graphql/queries';
import { GetEntityQuery, UpdateEntityMutation } from '@app/services/api/models';
import { useGqlQuery } from '@app/utils/hooks';
import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

const EntityUpdateView: React.FC<RouteComponentProps<{ id: string }>> = ({ history, match }) => {
  const { isLoading, data } = useGqlQuery<GetEntityQuery>(getEntity, { id: match.params.id });
  const entity = data && data.getEntity;

  const handleSubmit = async (
    values: IEntityAttributes,
    actions: FormikActions<IEntityAttributes>
  ) => {
    try {
      const { query, variables } = graphqlOperation(updateEntity, { input: values });
      const hasValidMutation = query && API.getGraphqlOperationType(query) === 'mutation';
      if (hasValidMutation) {
        const response = await API.graphql({ query, variables });
        const { errors, data: responceData } = response as GraphQLResult;
        const responceEntity = (responceData as UpdateEntityMutation).updateEntity;
        if (responceEntity) {
          history.push(`${ENTITIES_BASE_PATH}/${responceEntity.id}`);
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

  const mapAttributesToValues = (attrs: IEntity) => {
    if (!attrs) {
      return {
        name: '',
        description: ''
      };
    }
    const { id, name, description } = attrs;
    return { id, name, description };
  };

  return (
    <PageLayout loading={isLoading || !entity}>
      <Formik
        initialValues={mapAttributesToValues(entity as IEntity)}
        onSubmit={handleSubmit}
        render={EntityForm}
      />
    </PageLayout>
  );
};

export default EntityUpdateView;
