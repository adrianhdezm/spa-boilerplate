import { combineEpics } from 'redux-observable';

import createEntityEpic from '@app/store/entities/operations/create/epic';
import deleteEntityEpic from '@app/store/entities/operations/delete/epic';
import listEntitiesEpic from '@app/store/entities/operations/list/epic';
import readEntityEpic from '@app/store/entities/operations/read/epic';
import updateEntityEpic from '@app/store/entities/operations/update/epic';

export default combineEpics(
  listEntitiesEpic,
  createEntityEpic,
  readEntityEpic,
  updateEntityEpic,
  deleteEntityEpic
);
