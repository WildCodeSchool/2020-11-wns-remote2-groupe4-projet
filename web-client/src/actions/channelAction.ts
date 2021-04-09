import { Channel } from '../interfaces/channelInterface';

export type ChannelAction =
  | {
      type: 'SET_CURRENT_CHANNEL';
      isChannelOpen: boolean;
      currentChannel: Channel;
    }
  | {
      type: 'CLOSE_CURRENT_CHANNEL';
      isChannelOpen: boolean;
    };
