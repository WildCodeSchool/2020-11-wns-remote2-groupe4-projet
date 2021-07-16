import { createContext, Dispatch } from 'react';

import { RightAsideCtnrAction } from '../actions/rightAsideCtnrAction';

export type RightAsideCtnrInitialState = {
  isRightAsideCtnrOpen: boolean;
};

// initial state declared
export const rightAsideCtnrInitialState = {
  isRightAsideCtnrOpen: false,
};

const RightAsideCtnrContext = createContext<{
  rightAsideCtnrState: RightAsideCtnrInitialState;
  rightAsideCtnrDispatch: Dispatch<RightAsideCtnrAction>;
}>({
  rightAsideCtnrState: rightAsideCtnrInitialState,
  rightAsideCtnrDispatch: () => null,
});

export default RightAsideCtnrContext;
