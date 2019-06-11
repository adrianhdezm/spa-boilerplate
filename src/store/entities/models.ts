import {
  CreateEntityActionTypes,
  ICreateOperationState
} from '@app/store/entities/operations/create/models';
import {
  DeleteEntityActionTypes,
  IDeleteOperationState
} from '@app/store/entities/operations/delete/models';
import {
  IListOperationState,
  ListEntitiesActionTypes
} from '@app/store/entities/operations/list/models';
import {
  IReadOperationState,
  ReadEntityActionTypes
} from '@app/store/entities/operations/read/models';
import {
  IUpdateOperationState,
  UpdateEntityActionTypes
} from '@app/store/entities/operations/update/models';

export interface IEntityAttributes {
  name: string;
  description: string;
}

export interface IEntity extends IEntityAttributes {
  objectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEntitiesState {
  items: IEntity[];
  operations: {
    create: ICreateOperationState;
    read: IReadOperationState;
    update: IUpdateOperationState;
    delete: IDeleteOperationState;
    list: IListOperationState;
  };
}

export type EntityActionTypes =
  | ListEntitiesActionTypes
  | ReadEntityActionTypes
  | CreateEntityActionTypes
  | UpdateEntityActionTypes
  | DeleteEntityActionTypes;
