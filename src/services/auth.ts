import Auth, { CognitoUser } from '@aws-amplify/auth';

export const currentAuthenticatedUser = async (): Promise<CognitoUser | null> => {
  try {
    const user = Auth.currentAuthenticatedUser({
      // Optional, By default is false.
      // If set to true, this call will send a request to Cognito to get the latest user data
      bypassCache: false
    });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};
