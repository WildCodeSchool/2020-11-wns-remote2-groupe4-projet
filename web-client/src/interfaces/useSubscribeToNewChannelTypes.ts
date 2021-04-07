import { ApolloError } from '@apollo/client';

interface Channel {
  id: string;
  title: string;
}

interface UserInfoRetrieved {
  channels: Channel[];
}

export interface UserData {
  user: UserInfoRetrieved;
}

export interface UserParams {
  id: string;
}

export interface NewChannelForUser {
  newChannelForUser: Channel;
}

export interface NewChannelForUserParams {
  userId: string;
}

export type UseSubscribeToNewChannelReturn = {
  loading: boolean;
  error: ApolloError | undefined;
  data: UserData | undefined;
};
