import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import EntityDetails from '@app/components/EntityDetails';
import PageLayout from '@app/components/PageLayout';
import { IEntity } from '@app/models';
import { getEntity } from '@app/services/api/graphql/queries';
import { GetEntityQuery } from '@app/services/api/models';
import { useGqlQuery } from '@app/utils/hooks';

const EntityDetailsView: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { isLoading, data } = useGqlQuery<GetEntityQuery>(getEntity, { id: match.params.id });

  const entity = data && data.getEntity;

  return (
    <PageLayout loading={isLoading || !entity}>
      <EntityDetails data={entity as IEntity} />
    </PageLayout>
  );
};

export default EntityDetailsView;
