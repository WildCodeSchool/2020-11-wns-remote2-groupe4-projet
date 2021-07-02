import { ApolloError } from '@apollo/client';
import { Message } from './messageInterface';

export type ChannelData = {
  messagesByChannelId: Message[];
};

export type ChannelParams = {
  channelId: string;
};

export type NewChannelMessage = {
  newChannelMessage: Message;
};

export type NewChannelMessageParams = {
  channelId: string;
};

export type UseSubscribeToNewChannelMessageReturn = {
  loading: boolean;
  error: ApolloError | undefined;
  data: ChannelData | undefined;
};
