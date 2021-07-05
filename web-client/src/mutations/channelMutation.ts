import { gql } from '@apollo/client';

export const ADD_CHANNEL = gql`
  mutation CreateChannelWithFilteredSub(
    $title: String!
    $users: [AppUserIdInput!]!
  ) {
    createChannelWithFilteredSub(
      channelInput: { title: $title }
      users: $users
    ) {
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
