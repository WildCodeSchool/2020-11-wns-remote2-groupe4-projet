import { userProps } from '../interfaces/userInterface';
import { Action } from '../actions/userAction';

type AppState = {
  user: userProps | null;
};

// function reducer
const userReducer = (state: AppState, action: Action): AppState => {
  // define actions
  switch (action.type) {
    case 'USER_FETCHED':
      // new state to return
      return { ...state, user: action.user };
    case 'USER_DELETED':
      // new state to return
      return { user: null };
    default:
      return state;
  }
};

export default userReducer;
