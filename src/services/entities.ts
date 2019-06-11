import { getApiBaseUrl } from '@app/services/location';
import { IEntity, IEntityAttributes } from '@app/store/entities/models';

export const fetchEntities = async (cursor: number = 0, limit: number = 20): Promise<IEntity[]> => {
  try {
    const url = `${getApiBaseUrl()}/entities?_start=${cursor}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchEntity = async (id: string): Promise<IEntity> => {
  try {
    const url = `${getApiBaseUrl()}/entities/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateEntity = async (id: string, attrs: IEntityAttributes): Promise<IEntity> => {
  try {
    const url = `${getApiBaseUrl()}/entities/${id}`;
    const response = await fetch(url, {
      body: JSON.stringify(attrs),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createEntity = async (attrs: IEntityAttributes): Promise<IEntity> => {
  try {
    const url = `${getApiBaseUrl()}/entities`;
    const response = await fetch(url, {
      body: JSON.stringify(attrs),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteEntity = async (id: string) => {
  try {
    const url = `${getApiBaseUrl()}/entities/${id}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
