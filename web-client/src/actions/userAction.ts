import { userLoggedInProps } from '../interfaces/userInterface';

export type UserAction =
  | { type: 'USER_LOGGED_FETCH'; userLoggedInDetails: userLoggedInProps }
  | { type: 'USER_LOGGED_DELETE'; userLoggedInDetails: null };
