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

export const GET_EVENTS_CREATED_BY_USER_AUTHENTICATED = gql`
  query User($id: String!) {
    user(id: $id) {
      eventsCreatedByUser {
        id
        eventTitle
        eventStart
        eventEnd
        eventAllDay
        eventContent
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      firstname
      lastname
    }
  }
`;
