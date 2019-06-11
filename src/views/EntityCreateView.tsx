import { Formik, FormikActions } from 'formik';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import EntityForm from '@app/components/EntityForm';
import Page from '@app/components/Page';
import { ENTITY_PREFIX_PATH } from '@app/constants';
import { EntityActionTypes, IEntity, IEntityAttributes } from '@app/store/entities/models';
import {
  createEntityReset,
  createEntityStart
} from '@app/store/entities/operations/create/actions';
import { IAppState } from '@app/store/models';

interface IStateProps {
  data: IEntity;
  error: Error;
  itemIsUpdated: boolean;
}
interface IDispatchProps {
  createEntity: (attrs: IEntityAttributes) => void;
  resetActionData: () => void;
}

type EntityCreateViewProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

const EntityCreateView: React.FC<EntityCreateViewProps> = ({
  history,
  data,
  error,
  createEntity,
  resetActionData,
  itemIsUpdated
}) => {
  const formikRef = useRef<Formik<IEntityAttributes>>();

  useEffect(() => {
    if (error && formikRef.current) {
      formikRef.current.setErrors({
        name: error.message
      });
    }

    if (itemIsUpdated && !error) {
      resetActionData();
      history.push(`${ENTITY_PREFIX_PATH}/${data.objectId}`);
    }
  }, [itemIsUpdated]);

  const handleSubmit = async (
    values: IEntityAttributes,
    actions: FormikActions<IEntityAttributes>
  ) => {
    createEntity(values);
    actions.setSubmitting(false);
  };

  const initialValues: IEntityAttributes = {
    name: '',
    description: ''
  };

  return (
    <Page>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={EntityForm}
        ref={formikRef}
      />
    </Page>
  );
};

function mapStateToProps(state: IAppState) {
  const { item, error, isSuccess } = state.entities.operations.create;

  return {
    data: item,
    error,
    itemIsUpdated: isSuccess
  };
}

function mapDispatchToProps(dispatch: Dispatch<EntityActionTypes>) {
  return {
    createEntity: (attrs: IEntityAttributes) => dispatch(createEntityStart(attrs)),
    resetActionData: () => dispatch(createEntityReset())
  };
}

export default connect<IStateProps, IDispatchProps, RouteComponentProps<{}>>(
  mapStateToProps,
  mapDispatchToProps
)(EntityCreateView);
