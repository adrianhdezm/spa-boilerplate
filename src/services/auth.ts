import { getApiBaseUrl } from '@app/services/location';

export const login = async (username: string, password: string) => {
  try {
    const apiUrl = getApiBaseUrl();
    const responce = await fetch(`${apiUrl}/login`, {
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const { sessionToken } = await responce.json();
    if (typeof sessionToken !== 'undefined' && sessionToken) {
      window.sessionStorage.setItem('token', sessionToken);
      return true;
    }
    return false;
  } catch (error) {
    throw new Error('Failed to connect with the authorization server');
  }
};

export const isAuthenticated = () => !!window.sessionStorage.getItem('token');

export const logout = () => {
  window.sessionStorage.removeItem('token');
};
