import { gql } from '@apollo/client';

export const CREATE_NEW_EVENT = gql`
  mutation CreateCalendarEvent(
    $eventTitle: String!
    $eventStart: DateTime!
    $eventEnd: DateTime!
    $eventContent: String!
    $eventAllDay: Boolean!
  ) {
    createCalendarEvent(
      data: {
        eventTitle: $eventTitle
        eventStart: $eventStart
        eventEnd: $eventEnd
        eventContent: $eventContent
        eventAllDay: $eventAllDay
      }
    ) {
      eventTitle
    }
  }
`;

export const UPDATE_EVENT_BY_ID = gql`
  mutation UpdateCalendarEvent(
    $id: String!
    $eventTitle: String
    $eventStart: DateTime
    $eventEnd: DateTime
    $eventContent: String
    $eventAllDay: Boolean
  ) {
    updateCalendarEvent(
      id: $id
      data: {
        eventTitle: $eventTitle
        eventStart: $eventStart
        eventEnd: $eventEnd
        eventContent: $eventContent
        eventAllDay: $eventAllDay
      }
    ) {
      id
      eventTitle
      eventStart
      eventEnd
      eventContent
    }
  }
`;
