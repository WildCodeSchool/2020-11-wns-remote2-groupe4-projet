import { gql } from '@apollo/client';

export const GET_USER_CHANNELS = gql`
  query GetUserChannels($id: String!) {
    user(id: $id) {
      channels {
        id
        title
      }
    }
  }
`;
