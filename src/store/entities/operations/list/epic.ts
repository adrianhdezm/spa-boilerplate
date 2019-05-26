import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { fetchEntities } from '@app/services/entities';
import {
  listEntitiesFailure,
  listEntitiesSuccess
} from '@app/store/entities/operations/list/actions';
import { LIST_ENTITIES_START } from '@app/store/entities/operations/list/constants';
import { ListEntitiesActionTypes } from '@app/store/entities/operations/list/models';
import { IAppState } from '@app/store/models';

const listEntitiesEpic: Epic<ListEntitiesActionTypes, ListEntitiesActionTypes, IAppState> = (
  action$
) =>
  action$.pipe(
    ofType(LIST_ENTITIES_START),
    mergeMap(() =>
      from(fetchEntities()).pipe(
        map((entities) => listEntitiesSuccess(entities)),
        catchError((error) => of(listEntitiesFailure(error)))
      )
    )
  );

export default listEntitiesEpic;
