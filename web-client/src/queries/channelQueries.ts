import { gql } from '@apollo/client';

export const GET_CHANNEL = gql`
  query GetChannel($id: String!) {
    channel(id: $id) {
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
