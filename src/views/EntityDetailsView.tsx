import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import EntityDetails from '@app/components/EntityDetails';
import Page from '@app/components/Page';
import { EntityActionTypes, IEntity } from '@app/store/entities/models';
import { readEntityStart } from '@app/store/entities/operations/read/actions';
import { IAppState } from '@app/store/models';

interface IStateProps {
  data: IEntity;
  isLoading: boolean;
}
interface IDispatchProps {
  fetchEntity: (id: string) => void;
}

type EntityDetailsViewProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

const EntityDetailsView: React.FC<EntityDetailsViewProps> = ({
  match,
  isLoading,
  data,
  fetchEntity
}) => {
  useEffect(() => {
    fetchEntity(match.params.id);
  }, [match.params.id]);

  return (
    <Page loading={isLoading || !data}>
      <EntityDetails data={data} />
    </Page>
  );
};

function mapStateToProps(state: IAppState) {
  const { item, pending } = state.entities.operations.read;

  return {
    data: item,
    isLoading: pending
  };
}

function mapDispatchToProps(dispatch: Dispatch<EntityActionTypes>) {
  return {
    fetchEntity: (id: string) => dispatch(readEntityStart(id))
  };
}

export default connect<IStateProps, IDispatchProps, RouteComponentProps<{ id: string }>>(
  mapStateToProps,
  mapDispatchToProps
)(EntityDetailsView);
