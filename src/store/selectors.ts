import { IAppState } from '@app/store/models';

export const getEntities = (state: IAppState) => state.entities.items;
