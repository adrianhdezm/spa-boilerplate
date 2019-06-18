import { Formik, FormikActions } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import EntityForm from '@app/components/EntityForm';
import PageLayout from '@app/components/PageLayout';
import { ENTITIES_BASE_PATH } from '@app/constants';
import { readEntityReset, readEntityStart, updateEntityReset, updateEntityStart } from '@app/store/entities/actions';
import { IEntity, IEntityAttributes } from '@app/store/entities/models';
import { IAppState } from '@app/store/models';

const EntityUpdateView: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const formikRef = useRef<Formik<IEntityAttributes>>(null);

  const dispatch = useDispatch();
  const isLoading = useSelector<IAppState, boolean>((state) => state.entities.operations.query.pending);
  const data = useSelector<IAppState, IEntity | null>(
    (state) => state.entities.operations.query.results as IEntity | null
  );
  const error = useSelector<IAppState, Error | null>((state) => state.entities.operations.mutation.error);
  const itemIsUpdated = useSelector<IAppState, boolean>((state) => state.entities.operations.mutation.completed);

  useEffect(() => {
    const id = match.params.id;
    dispatch(readEntityStart({ id }));
    return () => {
      dispatch(readEntityReset());
    };
  }, [match.params.id]);

  useEffect(() => {
    if (error && formikRef.current) {
      formikRef.current.setErrors({
        name: error.message
      });
    }
    if (itemIsUpdated && data && !error) {
      history.push(`${ENTITIES_BASE_PATH}/${data.id}`);
    }
    return () => {
      dispatch(updateEntityReset());
    };
  }, [itemIsUpdated]);

  const handleSubmit = (values: IEntityAttributes, actions: FormikActions<IEntityAttributes>) => {
    if (data) {
      dispatch(updateEntityStart({ id: data.id, attrs: values }));
    }
    actions.setSubmitting(false);
  };

  const mapAttrsToValues = (attrs: IEntity) => {
    const { id, ...values } = attrs;
    return values;
  };

  /* tslint:disable:jsx-no-multiline-js */
  return (
    <PageLayout loading={isLoading}>
      {data ? (
        <Formik initialValues={mapAttrsToValues(data)} onSubmit={handleSubmit} render={EntityForm} ref={formikRef} />
      ) : null}
    </PageLayout>
  );
};

export default EntityUpdateView;
