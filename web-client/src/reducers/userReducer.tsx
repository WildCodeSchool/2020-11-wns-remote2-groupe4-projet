import { userLoggedInProps } from '../interfaces/userInterface';
import { Action } from '../actions/userAction';

type AppState = {
  userLoggedIn: userLoggedInProps | null;
};

const userReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'USER_FETCHED':
      return { ...state, userLoggedIn: action.userLoggedIn };
    case 'USER_DELETED':
      return { userLoggedIn: null };
    default:
      return state;
  }
};

export default userReducer;
