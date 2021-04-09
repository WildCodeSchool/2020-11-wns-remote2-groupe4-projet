import { createContext, Dispatch } from 'react';

import { userLoggedInProps } from '../interfaces/userInterface';
import { UserAction } from '../actions/userAction';

export type UserInitialState = {
  userLoggedInDetails: userLoggedInProps | null;
};

// initial state declared
export const userInitialState = {
  userLoggedInDetails: null,
};

const UserContext = createContext<{
  state: UserInitialState;
  dispatch: Dispatch<UserAction>;
}>({ state: userInitialState, dispatch: () => null });

export default UserContext;
