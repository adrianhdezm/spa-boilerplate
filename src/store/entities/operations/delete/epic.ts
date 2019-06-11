import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { deleteEntity } from '@app/services/entities';
import {
  deleteEntityFailure,
  deleteEntitySuccess
} from '@app/store/entities/operations/delete/actions';
import { DELETE_ENTITY_START } from '@app/store/entities/operations/delete/constants';
import {
  DeleteEntityActionTypes,
  IDeleteEntityStartAction
} from '@app/store/entities/operations/delete/models';
import { IAppState } from '@app/store/models';

const deleteEntityEpic: Epic<DeleteEntityActionTypes, DeleteEntityActionTypes, IAppState> = (
  action$
) =>
  action$.pipe(
    ofType(DELETE_ENTITY_START),
    mergeMap((action: IDeleteEntityStartAction) =>
      from(deleteEntity(action.payload.id)).pipe(
        map(() => deleteEntitySuccess(action.payload.id)),
        catchError((error) => of(deleteEntityFailure(error)))
      )
    )
  );

export default deleteEntityEpic;
