import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import EntityList from '@app/components/EntityList';
import PageLayout from '@app/components/PageLayout';
import { IEntity } from '@app/models';
import { listEntitys } from '@app/services/api/graphql/queries';
import { ListEntitysQuery } from '@app/services/api/models';
import { useGqlQuery } from '@app/utils/hooks';

const EntityListView: React.FC<RouteComponentProps<{}>> = () => {
  const { isLoading, data } = useGqlQuery<ListEntitysQuery>(listEntitys);

  const entities = data && data.listEntitys && data.listEntitys.items ? data.listEntitys.items : [];
  return (
    <PageLayout loading={isLoading || entities.length === 0}>
      <EntityList data={entities as IEntity[]} />
    </PageLayout>
  );
};

export default EntityListView;
