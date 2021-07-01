import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_NEW_CHANNEL_MESSAGE = gql`
  subscription SubscribeToNewChannelMessage($channelId: String!) {
    newChannelMessage(channelId: $channelId) {
      id
      content
      sentAt
      author {
        id
        firstname
        lastname
      }
    }
  }
`;
