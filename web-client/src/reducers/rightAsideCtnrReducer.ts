import { RightAsideCtnrAction } from '../actions/rightAsideCtnrAction';

type RightAsideCtnrState = {
  isRightAsideCtnrOpen: boolean;
};

const rightAsideCtnrReducer = (
  state: RightAsideCtnrState,
  action: RightAsideCtnrAction
): RightAsideCtnrState => {
  switch (action.type) {
    case 'OPEN_RIGHT_ASIDE_CTNR':
      return {
        isRightAsideCtnrOpen: true,
      };
    case 'CLOSE_RIGHT_ASIDE_CTNR':
      return { isRightAsideCtnrOpen: false };
    case 'TOGGLE_RIGHT_ASIDE_CTNR':
      return {
        isRightAsideCtnrOpen: !state.isRightAsideCtnrOpen,
      };
    default:
      return state;
  }
};

export default rightAsideCtnrReducer;