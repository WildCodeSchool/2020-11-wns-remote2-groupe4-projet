import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_NEW_CHANNEL = gql`
  subscription SubscribeToNewChannel($userId: String!) {
    newChannelForUser(userId: $userId) {
      id
      title
    }
  }
`;
