import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstname: String!
    $lastname: String!
    $phone: String!
    $address: String!
  ) {
    updateUser(
      data: {
        firstname: $firstname
        lastname: $lastname
        phone: $phone
        address: $address
      }
    ) {
      id
      firstname
      lastname
    }
  }
`;
