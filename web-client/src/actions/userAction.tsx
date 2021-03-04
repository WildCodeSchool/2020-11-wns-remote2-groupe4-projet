import { userLoggedInProps } from '../interfaces/userInterface';

export type Action =
  | { type: 'USER_FETCHED'; userLoggedIn: userLoggedInProps }
  | { type: 'USER_DELETED'; userLoggedIn: null };
