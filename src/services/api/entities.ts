import {
  CreateEntityMutation,
  DeleteEntityMutation,
  GetEntityQuery,
  ListEntitysQuery,
  UpdateEntityMutation
} from '@app/services/api/graphql/models';
import * as mutations from '@app/services/api/graphql/mutations';
import * as queries from '@app/services/api/graphql/queries';
import { IEntity, IEntityAttributes, IResponceEntity } from '@app/store/entities/models';
import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

const mapToEntity = (entity: IResponceEntity) => {
  const { id, name, tags } = entity;
  const description = entity.description || undefined;
  return {
    id,
    name,
    tags,
    description
  };
};

export const createEntity = async (attrs: IEntityAttributes) => {
  try {
    const { query, variables } = graphqlOperation(mutations.createEntity, { input: attrs });
    const hasValidMutation = query && API.getGraphqlOperationType(query) === 'mutation';
    if (hasValidMutation) {
      const response = await API.graphql({ query, variables });
      const { errors, data } = response as GraphQLResult;
      const entity = (data as CreateEntityMutation).createEntity;

      if (!entity || (errors && errors.length > 0)) {
        throw new Error('Response Error');
      }
      return mapToEntity(entity);
    } else {
      throw new Error('Not valid query was specified');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteEntity = async (id: string) => {
  try {
    const { query, variables } = graphqlOperation(mutations.deleteEntity, { input: { id } });
    const hasValidMutation = query && API.getGraphqlOperationType(query) === 'mutation';
    if (hasValidMutation) {
      const response = await API.graphql({ query, variables });
      const { errors, data: responceData } = response as GraphQLResult;
      const entity = (responceData as DeleteEntityMutation).deleteEntity;

      if (!entity || (errors && errors.length > 0)) {
        throw new Error('Response Error');
      }
      return mapToEntity(entity);
    } else {
      throw new Error('Not valid query was specified');
    }
  } catch (error) {
    throw error;
  }
};

export const updateEntity = async (id: string, attrs: IEntityAttributes) => {
  try {
    const { query, variables } = graphqlOperation(mutations.updateEntity, { input: { id, ...attrs } });
    const hasValidMutation = query && API.getGraphqlOperationType(query) === 'mutation';
    if (hasValidMutation) {
      const response = await API.graphql({ query, variables });
      const { errors, data: responceData } = response as GraphQLResult;
      const entity = (responceData as UpdateEntityMutation).updateEntity;

      if (!entity || (errors && errors.length > 0)) {
        throw new Error('Response Error');
      }
      return mapToEntity(entity);
    } else {
      throw new Error('Not valid query was specified');
    }
  } catch (error) {
    throw error;
  }
};

export const readEntity = async (id: string) => {
  try {
    const { query, variables } = graphqlOperation(queries.getEntity, { id });
    const hasValidQuery = query && API.getGraphqlOperationType(query) === 'query';
    if (hasValidQuery) {
      const response = await API.graphql({ query, variables });
      const { errors, data: responceData } = response as GraphQLResult;
      const entity = (responceData as GetEntityQuery).getEntity;
      if (!entity || (errors && errors.length > 0)) {
        throw new Error('Response Error');
      }
      return mapToEntity(entity);
    } else {
      throw new Error('Not valid query was specified');
    }
  } catch (error) {
    throw error;
  }
};

export const listEntities = async (tagFilter: string) => {
  try {
    const queryVariables =
      tagFilter === ''
        ? {}
        : {
            filter: {
              tags: { contains: tagFilter }
            }
          };

    const { query, variables } = graphqlOperation(queries.listEntitys, queryVariables);
    const hasValidQuery = query && API.getGraphqlOperationType(query) === 'query';
    if (hasValidQuery) {
      const response = await API.graphql({ query, variables });
      const { errors, data: responceData } = response as GraphQLResult;
      const data = (responceData as ListEntitysQuery).listEntitys;
      if (!(data && data.items) || (errors && errors.length > 0)) {
        throw new Error('Response Error');
      }
      return data.items as IEntity[];
    } else {
      throw new Error('Not valid query was specified');
    }
  } catch (error) {
    throw error;
  }
};
