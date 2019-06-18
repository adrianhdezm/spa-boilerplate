import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import EntityDetails from '@app/components/EntityDetails';
import PageLayout from '@app/components/PageLayout';
import { readEntityReset, readEntityStart } from '@app/store/entities/actions';
import { IEntity } from '@app/store/entities/models';
import { IAppState } from '@app/store/models';

const EntityDetailsView: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const dispatch = useDispatch();
  const data = useSelector<IAppState, IEntity | null>(
    (state) => state.entities.operations.query.results as IEntity | null
  );
  const isLoading = useSelector<IAppState, boolean>((state) => state.entities.operations.query.pending);

  useEffect(() => {
    const id = match.params.id;
    dispatch(readEntityStart({ id }));

    return () => {
      dispatch(readEntityReset());
    };
  }, [match.params.id]);

  return <PageLayout loading={isLoading}>{data ? <EntityDetails data={data} /> : null}</PageLayout>;
};

export default EntityDetailsView;
