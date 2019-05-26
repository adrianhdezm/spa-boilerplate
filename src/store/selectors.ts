import { IAppState } from '@app/store/models';

export const getEntities = (state: IAppState) => state.entities.items;
export const isAuthenticated = (state: IAppState) => !!state.user.sessionToken;
