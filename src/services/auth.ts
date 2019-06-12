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

export const login = async (email: string, password: string) => {
  const state = {
    authenticated: false,
    error: null
  };

  try {
    const user = await Auth.signIn(email, password);
    if (user) {
      return { ...state, authenticated: true };
    }

    if (user.challengeName) {
      throw new Error('User Challange Required');
    }
    return state;
  } catch (err) {
    if (err.code === 'NotAuthorizedException') {
      // The error happens when the incorrect password is provided
      return { ...state, error: { password: 'Incorrect password is provided' } };
    } else if (err.code === 'UserNotFoundException') {
      // The error happens when the supplied username/email does not exist in the Cognito user pool
      return { ...state, error: { email: 'Supplied username does not exist' } };
    } else {
      console.log(err);
      return { ...state, error: err };
    }
  }
};
