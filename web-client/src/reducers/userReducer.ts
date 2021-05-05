import { userLoggedInProps } from '../interfaces/userInterface';
import { UserAction } from '../actions/userAction';

type UserState = {
  userLoggedInDetails: userLoggedInProps | null;
};

const userReducer = (state: UserState, action: UserAction): UserState => {
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
