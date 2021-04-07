import { gql } from '@apollo/client';

export const AM_I_AUTHENTICATED = gql`
  query AmIAuthenticated {
    amIAuthenticated {
      id
      firstname
      lastname
    }
  }
`;

export const GET_USER_CHANNELS = gql`
  query GetUserChannels($id: String!) {
    user(id: $id) {
      channels {
        id
        title
        messages {
          id
          content
          author {
            id
            firstname
            lastname
          }
          sentAt
        }
        users {
          id
          firstname
          lastname
        }
      }
    }
  }
`;
