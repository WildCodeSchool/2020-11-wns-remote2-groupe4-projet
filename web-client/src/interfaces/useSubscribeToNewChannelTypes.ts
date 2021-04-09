import { ApolloError } from '@apollo/client';
import { Channel } from './channelInterface';

export type UserData = {
  user: { channels: Channel[] };
};

export type UserParams = {
  id: string;
};

export type NewChannelForUser = {
  newChannelForUser: Channel;
};

export type NewChannelForUserParams = {
  userId: string;
};

export type UseSubscribeToNewChannelReturn = {
  loading: boolean;
  error: ApolloError | undefined;
  data: UserData | undefined;
};
