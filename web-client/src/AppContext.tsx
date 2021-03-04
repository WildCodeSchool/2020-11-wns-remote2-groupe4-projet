import { createContext, Dispatch } from 'react';

import { Action } from './actions/userAction';

type userProps = {
  id: string;
  firstname: string;
};

type TInitialState = {
  user: userProps | null;
};

// initial state declared
const initialState = {
  user: null,
};

const AppContext = createContext<{
  state: TInitialState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export default AppContext;
