import { gql } from '@apollo/client';

export const CREATE_SESSION = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      id
      firstname
      lastname
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation {
    deleteSession
  }
`;
