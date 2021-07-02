import { gql } from '@apollo/client';

export const GET_CHANNEL_MESSAGES = gql`
  query GetMessagesByChannelId($channelId: String!) {
    messagesByChannelId(channelId: $channelId) {
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
