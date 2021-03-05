import { createContext, Dispatch } from 'react';

import { userLoggedInProps } from '../interfaces/userInterface';
import { Action } from '../actions/userAction';

type TInitialState = {
  userLoggedInDetails: userLoggedInProps | null;
};

// initial state declared
const initialState = {
  userLoggedInDetails: null,
};

const AppContext = createContext<{
  state: TInitialState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export default AppContext;
