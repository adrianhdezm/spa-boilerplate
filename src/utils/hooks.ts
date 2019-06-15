import { useEffect, useReducer } from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

export const OPERATION_START = 'OPERATION_START';
export const OPERATION_SUCCESS = 'OPERATION_SUCCESS';
export const OPERATION_FAILURE = 'OPERATION_FAILURE';

interface IStartAction {
  type: typeof OPERATION_START;
}

interface ISuccessAction<T> {
  type: typeof OPERATION_SUCCESS;
  payload: T;
}

interface IErrorAction {
  type: typeof OPERATION_FAILURE;
  payload: Error | null;
}

type ActionTypes<T> = IStartAction | ISuccessAction<T> | IErrorAction;

interface IConnectState<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

export const useGqlQuery = <T>(gqlQuery: string) => {
  function dataQueryReducer(state: IConnectState<T>, action: ActionTypes<T>): IConnectState<T> {
    switch (action.type) {
      case OPERATION_START:
        return {
          ...state,
          isLoading: true
        };
      case OPERATION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload
        };
      case OPERATION_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        throw new Error();
    }
  }

  const initialState: IConnectState<T> = {
    isLoading: false,
    error: null,
    data: null
  };

  const [queryState, dispatch] = useReducer(dataQueryReducer, initialState);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { query, variables } = graphqlOperation(gqlQuery);
      const hasValidQuery = query && API.getGraphqlOperationType(query) === 'query';
      try {
        if (hasValidQuery && mounted) {
          dispatch({ type: OPERATION_START });
          const response = await API.graphql({ query, variables });
          const { errors, data } = response as GraphQLResult;

          if (data) {
            dispatch({ type: OPERATION_SUCCESS, payload: (data as unknown) as T });
          }

          if (errors && errors.length > 0) {
            throw new Error('Response Error');
          }
        } else {
          throw new Error('Not valid query was specified');
        }
      } catch (err) {
        if (mounted) {
          dispatch({ type: OPERATION_FAILURE, payload: err });
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [gqlQuery]);
  return queryState;
};
