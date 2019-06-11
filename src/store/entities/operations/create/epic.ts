import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { createEntity } from '@app/services/entities';
import {
  createEntityFailure,
  createEntitySuccess
} from '@app/store/entities/operations/create/actions';
import { CREATE_ENTITY_START } from '@app/store/entities/operations/create/constants';
import {
  CreateEntityActionTypes,
  ICreateEntityStartAction
} from '@app/store/entities/operations/create/models';
import { IAppState } from '@app/store/models';

const createEntityEpic: Epic<CreateEntityActionTypes, CreateEntityActionTypes, IAppState> = (
  action$
) =>
  action$.pipe(
    ofType(CREATE_ENTITY_START),
    mergeMap((action: ICreateEntityStartAction) => {
      const { attrs } = action.payload;
      return from(createEntity(attrs)).pipe(
        map((entity) => createEntitySuccess(entity)),
        catchError((error) => of(createEntityFailure(error)))
      );
    })
  );

export default createEntityEpic;
