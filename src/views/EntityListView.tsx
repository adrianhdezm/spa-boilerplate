import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import EntityList from '@app/components/EntityList';
import Page from '@app/components/Page';
import { EntityActionTypes, IEntity } from '@app/store/entities/models';
import {
  deleteEntityReset,
  deleteEntityStart
} from '@app/store/entities/operations/delete/actions';
import { listEntitiesStart } from '@app/store/entities/operations/list/actions';
import { IAppState } from '@app/store/models';
import { getEntities as getEntitiesSelector } from '@app/store/selectors';

interface IStateProps {
  data: IEntity[];
  isLoading: boolean;
  itemIsDeleted: boolean;
  error: Error;
}
interface IDispatchProps {
  deleteEntity: (id: string) => void;
  fetchEntities: () => void;
  resetActionData: () => void;
}

type EntityListViewProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

const EntityListView: React.FC<EntityListViewProps> = ({
  data,
  isLoading,
  deleteEntity,
  fetchEntities,
  resetActionData,
  itemIsDeleted,
  error
}) => {
  const handleDelete = (objectId: string) => {
    deleteEntity(objectId);
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  useEffect(() => {
    if (itemIsDeleted && !error) {
      resetActionData();
    }
  }, [itemIsDeleted]);

  return (
    <Page loading={isLoading || !data}>
      <EntityList data={data} onDelete={handleDelete} />
    </Page>
  );
};

function mapStateToProps(state: IAppState) {
  const { pending } = state.entities.operations.list;
  const { isSuccess: itemIsDeleted, error } = state.entities.operations.delete;

  return {
    data: getEntitiesSelector(state),
    isLoading: pending,
    itemIsDeleted,
    error
  };
}

function mapDispatchToProps(dispatch: Dispatch<EntityActionTypes>) {
  return {
    deleteEntity: (id: string) => dispatch(deleteEntityStart(id)),
    fetchEntities: () => dispatch(listEntitiesStart()),
    resetActionData: () => dispatch(deleteEntityReset())
  };
}

export default connect<IStateProps, IDispatchProps, RouteComponentProps<{}>>(
  mapStateToProps,
  mapDispatchToProps
)(EntityListView);
