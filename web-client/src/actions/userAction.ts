import { userLoggedInProps } from '../interfaces/userInterface';

export type Action =
  | { type: 'USER_LOGGED_FETCH'; userLoggedInDetails: userLoggedInProps }
  | { type: 'USER_LOGGED_DELETE'; userLoggedInDetails: null };
