import { CognitoUser } from '@aws-amplify/auth';

export interface ILoginFormAttributes {
  password: string;
  email: string;
  newPassword: string;
  code: string;
}

export interface ILoginFormState {
  step: string;
  user: CognitoUser | null;
}

export interface IEntity {
  id: string;
  name: string;
  description: string | null;
}
