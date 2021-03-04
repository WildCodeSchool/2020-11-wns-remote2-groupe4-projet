import { userProps } from '../interfaces/userInterface';

export type Action =
  | { type: 'USER_FETCHED'; user: userProps }
  | { type: 'USER_DELETED'; user: null };
