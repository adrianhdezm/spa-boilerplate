import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useData } from '@app/hooks';
import { fetchEntity } from '@app/services/entities';
import Page from '@ui/Page';
import EntityDetails from '@ui/EntityDetails';

const EntityDetailsView: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { data, isLoading } = useData(fetchEntity, match.params.id);
  return (
    <Page loading={isLoading || !data}>
      <EntityDetails data={data} />
    </Page>
  );
};

export default EntityDetailsView;
