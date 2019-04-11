import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IEntity } from '@app/models';
import { fetchEntities, deleteEntity } from '@app/services/entities';
import { useData } from '@app/hooks';
import Page from '@ui/Page';
import EntityList from '@ui/EntityList';

const EntityListView: React.FC<RouteComponentProps<{}>> = () => {
  const { data, setData, setError, isLoading } = useData(fetchEntities, '/');

  const handleDelete = async (objectId: string) => {
    try {
      await deleteEntity(objectId);
      setData(data.filter((entity: IEntity) => entity.objectId !== objectId));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Page loading={isLoading || !data}>
      <EntityList data={data} onDelete={handleDelete} />
    </Page>
  );
};

export default EntityListView;
