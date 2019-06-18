export interface IEntityAttributes {
  name: string;
  description: string;
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
