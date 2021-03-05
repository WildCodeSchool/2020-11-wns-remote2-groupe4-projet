import { userLoggedInProps } from '../interfaces/userInterface';
import { Action } from '../actions/userAction';

type AppState = {
  userLoggedInDetails: userLoggedInProps | null;
};

const userReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'USER_LOGGED_FETCH':
      return { ...state, userLoggedInDetails: action.userLoggedInDetails };
    case 'USER_LOGGED_DELETE':
      return { userLoggedInDetails: null };
    default:
      return state;
  }
};

export default userReducer;
