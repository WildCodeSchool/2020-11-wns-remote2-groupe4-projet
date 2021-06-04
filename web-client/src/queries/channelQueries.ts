import { gql } from '@apollo/client';

export const GET_CHANNEL_MESSAGES = gql`
  query GetChannelMessages($id: String!) {
    channel(id: $id) {
      messages {
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
  }
`;
