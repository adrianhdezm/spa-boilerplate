import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { updateEntity } from '@app/services/entities';
import {
  updateEntityFailure,
  updateEntitySuccess
} from '@app/store/entities/operations/update/actions';
import { UPDATE_ENTITY_START } from '@app/store/entities/operations/update/constants';
import {
  IUpdateEntityStartAction,
  UpdateEntityActionTypes
} from '@app/store/entities/operations/update/models';
import { IAppState } from '@app/store/models';

const updateEntityEpic: Epic<UpdateEntityActionTypes, UpdateEntityActionTypes, IAppState> = (
  action$
) =>
  action$.pipe(
    ofType(UPDATE_ENTITY_START),
    mergeMap((action: IUpdateEntityStartAction) => {
      const { id, attrs } = action.payload;
      return from(updateEntity(id, attrs)).pipe(
        map((entity) => updateEntitySuccess(entity)),
        catchError((error) => of(updateEntityFailure(error)))
      );
    })
  );

export default updateEntityEpic;
