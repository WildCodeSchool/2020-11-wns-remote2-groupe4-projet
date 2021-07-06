export type RightAsideCtnrAction =
  | {
      type: 'OPEN_RIGHT_ASIDE_CTNR';
      isRightAsideCtnrOpen: boolean;
    }
  | {
      type: 'CLOSE_RIGHT_ASIDE_CTNR';
      isRightAsideCtnrOpen: boolean;
    }
  | {
      type: 'TOGGLE_RIGHT_ASIDE_CTNR';
      isRightAsideCtnrOpen: boolean;
    };
