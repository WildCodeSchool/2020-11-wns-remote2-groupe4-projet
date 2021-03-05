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
