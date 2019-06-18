import { Formik, FormikActions } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import EntityForm from '@app/components/EntityForm';
import PageLayout from '@app/components/PageLayout';
import { ENTITIES_BASE_PATH } from '@app/constants';
import { createEntityReset, createEntityStart } from '@app/store/entities/actions';
import { IEntity, IEntityAttributes } from '@app/store/entities/models';
import { IAppState } from '@app/store/models';

const EntityCreateView: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const formikRef = useRef<Formik<IEntityAttributes>>(null);
  const data = useSelector<IAppState, IEntity | null>((state) => state.entities.operations.mutation.item);
  const error = useSelector<IAppState, Error | null>((state) => state.entities.operations.mutation.error);
  const completed = useSelector<IAppState, boolean>((state) => state.entities.operations.mutation.completed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && formikRef.current) {
      formikRef.current.setErrors({
        name: error.message
      });
    }

    if (completed && data && !error) {
      history.push(`${ENTITIES_BASE_PATH}/${data.id}`);
    }

    return () => {
      dispatch(createEntityReset());
    };
  }, [completed]);

  const handleSubmit = (values: IEntityAttributes, actions: FormikActions<IEntityAttributes>) => {
    dispatch(createEntityStart({ attrs: values }));
    actions.setSubmitting(false);
  };

  const initialValues: IEntityAttributes = {
    name: '',
    description: ''
  };

  return (
    <PageLayout>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} render={EntityForm} ref={formikRef} />
    </PageLayout>
  );
};

export default EntityCreateView;
