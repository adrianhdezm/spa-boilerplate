import { Formik, FormikActions } from 'formik';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import EntityForm from '@app/components/EntityForm';
import Page from '@app/components/Page';
import { ENTITY_PREFIX_PATH } from '@app/constants';
import { EntityActionTypes, IEntity, IEntityAttributes } from '@app/store/entities/models';
import { readEntityStart } from '@app/store/entities/operations/read/actions';
import {
  updateEntityReset,
  updateEntityStart
} from '@app/store/entities/operations/update/actions';
import { IAppState } from '@app/store/models';

interface IStateProps {
  data: IEntity;
  isLoading: boolean;
  itemIsUpdated: boolean;
  error: Error;
}
interface IDispatchProps {
  fetchEntity: (id: string) => void;
  updateEntity: (id: string, attrs: IEntityAttributes) => void;
  resetUpdate: () => void;
}

type EntityEditViewProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

const EntityEditView: React.FC<EntityEditViewProps> = ({
  data,
  match,
  history,
  isLoading,
  fetchEntity,
  updateEntity,
  itemIsUpdated,
  resetUpdate,
  error
}) => {
  const formikRef = useRef<Formik<IEntityAttributes>>();

  useEffect(() => {
    fetchEntity(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (error) {
      formikRef.current.setErrors({
        name: error.message
      });
    }
    if (itemIsUpdated && !error) {
      resetUpdate();
      history.push(`${ENTITY_PREFIX_PATH}/${data.objectId}`);
    }
  }, [itemIsUpdated]);

  const handleSubmit = async (
    values: IEntityAttributes,
    actions: FormikActions<IEntityAttributes>
  ) => {
    const { objectId } = data;
    if (objectId) {
      updateEntity(objectId, values);
    }
    actions.setSubmitting(false);
  };

  const mapAttributesToValues = (attrs: IEntity) => {
    if (!attrs) {
      return {};
    }
    const { objectId, createdAt, updatedAt, ...values } = attrs;
    return values;
  };

  return (
    <Page loading={isLoading || !data}>
      <Formik
        initialValues={mapAttributesToValues(data)}
        onSubmit={handleSubmit}
        render={EntityForm}
        ref={formikRef}
      />
    </Page>
  );
};

function mapStateToProps(state: IAppState) {
  const { item, pending: isLoading } = state.entities.operations.read;
  const { isSuccess: itemIsUpdated, error, pending: isWriting } = state.entities.operations.update;

  return {
    data: item,
    isLoading,
    error,
    isWriting,
    itemIsUpdated
  };
}

function mapDispatchToProps(dispatch: Dispatch<EntityActionTypes>) {
  return {
    fetchEntity: (id: string) => dispatch(readEntityStart(id)),
    updateEntity: (id: string, attrs: IEntityAttributes) => dispatch(updateEntityStart(id, attrs)),
    resetUpdate: () => dispatch(updateEntityReset())
  };
}

export default connect<IStateProps, IDispatchProps, RouteComponentProps<{ id: string }>>(
  mapStateToProps,
  mapDispatchToProps
)(EntityEditView);
