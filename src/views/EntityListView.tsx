import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import EntityList from '@app/components/EntityList';
import PageLayout from '@app/components/PageLayout';
import { IEntity } from '@app/models';
import { deleteEntity } from '@app/services/api/graphql/mutations';
import { listEntitys } from '@app/services/api/graphql/queries';
import { DeleteEntityMutation, ListEntitysQuery } from '@app/services/api/models';
import { useGqlQuery } from '@app/utils/hooks';
import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

const EntityListView: React.FC<RouteComponentProps<{}>> = () => {
  const [entities, setEntities] = useState<IEntity[]>([]);

  const { isLoading, data } = useGqlQuery<ListEntitysQuery>(listEntitys);

  const handleDelete = async (id: string) => {
    try {
      const { query, variables } = graphqlOperation(deleteEntity, { input: { id } });
      const hasValidMutation = query && API.getGraphqlOperationType(query) === 'mutation';
      if (hasValidMutation) {
        const response = await API.graphql({ query, variables });
        const { errors, data: responceData } = response as GraphQLResult;
        const responceEntity = (responceData as DeleteEntityMutation).deleteEntity;
        const idx = entities.findIndex((item) => item.id === (responceEntity as IEntity).id);
        setEntities([...entities.slice(0, idx), ...entities.slice(idx + 1)]);

        if (errors && errors.length > 0) {
          throw new Error('Response Error');
        }
      }
    } catch (error) {
      throw new Error('Delete Error');
    }
  };

  useEffect(() => {
    if (data && data.listEntitys && data.listEntitys.items) {
      const items = data.listEntitys.items;
      setEntities(items as IEntity[]);
    }
  }, [data]);

  return (
    <PageLayout loading={isLoading || entities.length === 0}>
      <EntityList data={entities} onDelete={handleDelete} />
    </PageLayout>
  );
};

export default EntityListView;
