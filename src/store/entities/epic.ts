import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'ts-action-operators';

import {
  createEntity,
  deleteEntity,
  listEntities,
  readEntity,
  updateEntity
} from '@app/services/api/entities';
import {
  createEntityActions,
  createEntityFailure,
  createEntityStart,
  createEntitySuccess,
  deleteEntityActions,
  deleteEntityFailure,
  deleteEntityStart,
  deleteEntitySuccess,
  listEntitiesActions,
  listEntitiesFailure,
  listEntitiesStart,
  listEntitiesSuccess,
  readEntityActions,
  readEntityFailure,
  readEntityStart,
  readEntitySuccess,
  updateEntityActions,
  updateEntityFailure,
  updateEntityStart,
  updateEntitySuccess
} from '@app/store/entities/actions';
import { IAppState } from '@app/store/models';
import { getEntities } from '@app/store/selectors';

const createEntityEpic: Epic<typeof createEntityActions, typeof createEntityActions, IAppState> = (actions$) =>
  actions$.pipe(
    ofType(createEntityStart),
    mergeMap((action) => {
      const { attrs } = action.payload;
      return from(createEntity(attrs)).pipe(
        map((entity) => createEntitySuccess({ entity })),
        catchError((error) => of(createEntityFailure({ error })))
      );
    })
  );

const readEntityEpic: Epic<typeof readEntityActions, typeof readEntityActions, IAppState> = (actions$, state$) =>
  actions$.pipe(
    ofType(readEntityStart),
    mergeMap((action) => {
      const { id } = action.payload;
      // Fetches a single entity from API unless it is cached.
      const entities = getEntities(state$.value);
      const idx = entities.findIndex((entity) => entity.id === id);
      if (idx > -1) {
        return of(readEntitySuccess({ entity: entities[idx] }));
      }

      return from(readEntity(id)).pipe(
        map((entity) => readEntitySuccess({ entity })),
        catchError((error) => of(readEntityFailure({ error })))
      );
    })
  );

const updateEntityEpic: Epic<typeof updateEntityActions, typeof updateEntityActions, IAppState> = (actions$) =>
  actions$.pipe(
    ofType(updateEntityStart),
    mergeMap((action) => {
      const { id, attrs } = action.payload;
      return from(updateEntity(id, attrs)).pipe(
        map((entity) => updateEntitySuccess({ entity })),
        catchError((error) => of(updateEntityFailure({ error })))
      );
    })
  );

const deleteEntityEpic: Epic<typeof deleteEntityActions, typeof deleteEntityActions, IAppState> = (actions$) =>
  actions$.pipe(
    ofType(deleteEntityStart),
    mergeMap((action) => {
      const { id } = action.payload;
      return from(deleteEntity(id)).pipe(
        map((entity) => deleteEntitySuccess({ entity })),
        catchError((error) => of(deleteEntityFailure({ error })))
      );
    })
  );

const listEntitiesEpic: Epic<typeof listEntitiesActions, typeof listEntitiesActions, IAppState> = (actions$) =>
  actions$.pipe(
    ofType(listEntitiesStart),
    mergeMap((action) => {
      const { tagFilter, searchTerm } = action.payload;
      return from(listEntities(tagFilter, searchTerm)).pipe(
        map((entities) => listEntitiesSuccess({ entities })),
        catchError((error) => of(listEntitiesFailure({ error })))
      );
    })
  );

export default combineEpics(listEntitiesEpic, createEntityEpic, readEntityEpic, updateEntityEpic, deleteEntityEpic);
