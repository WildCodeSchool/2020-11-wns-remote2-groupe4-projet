import { gql } from '@apollo/client';

export const SUBSCRIBE_TO_NEW_CHANNEL = gql`
  subscription SubscribeToNewChannel($userId: String!) {
    newChannelForUser(userId: $userId) {
      id
      title
      messages {
        id
        sentAt
        content
        author {
          id
          firstname
          lastname
        }
      }
      users {
        id
        firstname
        lastname
      }
    }
  }
`;
