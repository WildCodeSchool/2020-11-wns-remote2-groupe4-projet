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

export const GET_EVENTS_CREATED_BY_USER_AUTHENTICATED = gql`
  query User($id: String!) {
    user(id: $id) {
      eventsCreatedByUser {
        eventTitle
        eventStart
        eventEnd
        eventAllDay
        eventContent
      }
    }
  }
`;
