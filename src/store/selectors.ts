import { IAppState } from '@app/store/models';

export const getEntities = (state: IAppState) => state.entities.items;
export const isAuthenticated = (state: IAppState) => !!state.user.sessionToken;
export const getPageCursor = (state: IAppState) => state.entities.operations.list.pageCursor;
export const getPageLimit = (state: IAppState) => state.entities.operations.list.pageLimit;
