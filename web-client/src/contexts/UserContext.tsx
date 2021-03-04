import { createContext, Dispatch } from 'react';

import { userLoggedInProps } from '../interfaces/userInterface';
import { Action } from '../actions/userAction';

type TInitialState = {
  userLoggedIn: userLoggedInProps | null;
};

// initial state declared
const initialState = {
  userLoggedIn: null,
};

const AppContext = createContext<{
  state: TInitialState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export default AppContext;
