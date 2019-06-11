import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { fetchEntity } from '@app/services/entities';
import { readEntityFailure, readEntitySuccess } from '@app/store/entities/operations/read/actions';
import { READ_ENTITY_START } from '@app/store/entities/operations/read/constants';
import {
  IReadEntityStartAction,
  ReadEntityActionTypes
} from '@app/store/entities/operations/read/models';
import { IAppState } from '@app/store/models';
import { getEntities } from '@app/store/selectors';

const readEntityEpic: Epic<ReadEntityActionTypes, ReadEntityActionTypes, IAppState> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType(READ_ENTITY_START),
    mergeMap((action: IReadEntityStartAction) => {
      const { id } = action.payload;
      // Fetches a single entity from API unless it is cached.
      const entities = getEntities(state$.value);
      const idx = entities.findIndex((entity) => entity.objectId === id);
      if (idx > -1) {
        return of(readEntitySuccess(entities[idx]));
      }

      return from(fetchEntity(id)).pipe(
        map((entity) => readEntitySuccess(entity)),
        catchError((error) => of(readEntityFailure(error)))
      );
    })
  );

export default readEntityEpic;
