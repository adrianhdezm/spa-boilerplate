import { action, payload, union } from 'ts-action';

import { IEntity, IEntityAttributes } from '@app/store/entities/models';

export const createEntityStart = action('CREATE_ENTITY_START', payload<{ attrs: IEntityAttributes }>());
export const createEntitySuccess = action('CREATE_ENTITY_SUCCESS', payload<{ entity: IEntity }>());
export const createEntityFailure = action('CREATE_ENTITY_FAILURE', payload<{ error: Error }>());
export const createEntityReset = action('CREATE_ENTITY_RESET');
export const createEntityActions = union(
  createEntityStart,
  createEntitySuccess,
  createEntityFailure,
  createEntityReset
);

export const updateEntityStart = action('UPDATE_ENTITY_START', payload<{ id: string; attrs: IEntityAttributes }>());
export const updateEntitySuccess = action('UPDATE_ENTITY_SUCCESS', payload<{ entity: IEntity }>());
export const updateEntityFailure = action('UPDATE_ENTITY_FAILURE', payload<{ error: Error }>());
export const updateEntityReset = action('UPDATE_ENTITY_RESET');
export const updateEntityActions = union(
  updateEntityStart,
  updateEntitySuccess,
  updateEntityFailure,
  updateEntityReset
);

export const deleteEntityStart = action('DELETE_ENTITY_START', payload<{ id: string }>());
export const deleteEntitySuccess = action('DELETE_ENTITY_SUCCESS', payload<{ entity: IEntity }>());
export const deleteEntityFailure = action('DELETE_ENTITY_FAILURE', payload<{ error: Error }>());
export const deleteEntityReset = action('DELETE_ENTITY_RESET');
export const deleteEntityActions = union(
  deleteEntityStart,
  deleteEntitySuccess,
  deleteEntityFailure,
  deleteEntityReset
);

export const readEntityStart = action('READ_ENTITY_START', payload<{ id: string }>());
export const readEntitySuccess = action('READ_ENTITY_SUCCESS', payload<{ entity: IEntity }>());
export const readEntityFailure = action('READ_ENTITY_FAILURE', payload<{ error: Error }>());
export const readEntityReset = action('READ_ENTITY_RESET');
export const readEntityActions = union(readEntityStart, readEntitySuccess, readEntityFailure, readEntityReset);

export const listEntitiesStart = action('LIST_ENTITIES_START');
export const listEntitiesSuccess = action('LIST_ENTITIES_SUCCESS', payload<{ entities: IEntity[] }>());
export const listEntitiesFailure = action('LIST_ENTITIES_FAILURE', payload<{ error: Error }>());
export const listEntitiesReset = action('LIST_ENTITY_RESET');
export const listEntitiesActions = union(
  listEntitiesStart,
  listEntitiesSuccess,
  listEntitiesFailure,
  listEntitiesReset
);

export type EntityActions =
  | typeof listEntitiesActions
  | typeof createEntityActions
  | typeof readEntityActions
  | typeof updateEntityActions
  | typeof deleteEntityActions;
