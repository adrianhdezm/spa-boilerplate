import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import EntityList from '@app/components/EntityList';
import PageLayout from '@app/components/PageLayout';
import {
  deleteEntityReset,
  deleteEntityStart,
  listEntitiesReset,
  listEntitiesStart
} from '@app/store/entities/actions';
import { IEntity } from '@app/store/entities/models';
import { IAppState } from '@app/store/models';
import { getEntities as getEntitiesSelector } from '@app/store/selectors';

const EntityListView: React.FC<RouteComponentProps<{}>> = () => {
  const dispatch = useDispatch();
  const data = useSelector<IAppState, IEntity[]>((state) => getEntitiesSelector(state));
  const isLoading = useSelector<IAppState, boolean>((state) => state.entities.operations.query.pending);
  const itemWasDeleted = useSelector<IAppState, boolean>((state) => state.entities.operations.mutation.completed);
  const error = useSelector<IAppState, Error | null>((state) => state.entities.operations.mutation.error);

  const handleDelete = (id: string) => {
    dispatch(deleteEntityStart({ id }));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    return () => {
      dispatch(deleteEntityReset());
    };
  }, [itemWasDeleted]);

  useEffect(() => {
    dispatch(listEntitiesStart());

    return () => {
      dispatch(listEntitiesReset());
    };
  }, []);

  return (
    <PageLayout loading={isLoading}>{data ? <EntityList data={data} onDelete={handleDelete} /> : null}</PageLayout>
  );
};

export default EntityListView;
