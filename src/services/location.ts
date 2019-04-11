import { DEV_API_BASE_URL } from '@app/constants';

export const getApiBaseUrl = () => {
  // Define Location based on the environment
  return DEV_API_BASE_URL;
};
