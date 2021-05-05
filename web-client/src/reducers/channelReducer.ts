import { ChannelAction } from '../actions/channelAction';
import { Channel } from '../interfaces/channelInterface';

type ChannelState = {
  currentChannel?: Channel | null;
  isChannelOpen?: boolean;
};

const channelReducer = (
  state: ChannelState,
  action: ChannelAction
): ChannelState => {
  switch (action.type) {
    case 'SET_CURRENT_CHANNEL':
      return {
        ...state,
        currentChannel: action.currentChannel,
        isChannelOpen: true,
      };
    case 'CLOSE_CURRENT_CHANNEL':
      return { isChannelOpen: false };
    default:
      return state;
  }
};

export default channelReducer;
