import Auth from '@aws-amplify/auth';

const isUserAuthenticated = (negation: boolean) => {
  return async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({
        // Optional, By default is false.
        // If set to true, this call will send a request to Cognito to get the latest user data
        bypassCache: false
      });
      if (user) {
        return negation;
      }
      return !negation;
    } catch (error) {
      return !negation;
    }
  };
};

export const isAuthenticated = isUserAuthenticated(true);
export const isNotAuthenticated = isUserAuthenticated(false);
