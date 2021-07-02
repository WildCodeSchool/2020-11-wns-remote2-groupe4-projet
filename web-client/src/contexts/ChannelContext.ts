import { createContext, Dispatch } from 'react';

import { ChannelAction } from '../actions/channelAction';
import { Channel } from '../interfaces/channelInterface';

export type ChannelInitialState = {
  isChannelOpen?: boolean;
  currentChannel: Channel | null;
};

// initial state declared
export const channelInitialState = {
  isChannelOpen: false,
  currentChannel: null,
};

const ChannelContext = createContext<{
  channelState: ChannelInitialState;
  channelDispatch: Dispatch<ChannelAction>;
}>({ channelState: channelInitialState, channelDispatch: () => null });

export default ChannelContext;
