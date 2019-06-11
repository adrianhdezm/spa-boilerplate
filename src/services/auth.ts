import { getApiBaseUrl } from '@app/services/location';

export const login = async (username: string, password: string): Promise<string> => {
  try {
    const apiUrl = getApiBaseUrl();
    const response = await fetch(`${apiUrl}/login`, {
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const { sessionToken } = await response.json();
    return sessionToken;
  } catch (error) {
    if (!error.message) {
      throw new Error('Failed to connect with the authorization server');
    }
    throw error;
  }
};
