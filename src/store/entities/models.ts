export interface IResponceEntity {
  __typename: 'Entity';
  id: string;
  name: string;
  description: string | null;
  tags: string[];
}

export interface IEntityAttributes {
  name: string;
  description?: string;
  tags: string[];
}

export interface IEntity extends IEntityAttributes {
  id: string;
}

export interface IMutationOperationState {
  item: IEntity | null;
  completed: boolean;
  pending: boolean;
  error: Error | null;
}

export interface IQueryOperationState {
  results: IEntity | IEntity[] | null;
  completed: boolean;
  pending: boolean;
  error: Error | null;
}

export interface IEntitiesState {
  items: IEntity[];
  operations: {
    query: IQueryOperationState;
    mutation: IMutationOperationState;
  };
}
