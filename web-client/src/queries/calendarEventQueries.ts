import { gql } from '@apollo/client';

export const CREATE_NEW_EVENT = gql`
  mutation CreateCalendarEvent(
    $eventId: String!
    $eventTitle: String!
    $eventStart: DateTime!
    $eventEnd: DateTime!
    $eventContent: String!
    $eventAllDay: Boolean!
  ) {
    createCalendarEvent(
      data: {
        eventId: $eventId
        eventTitle: $eventTitle
        eventStart: $eventStart
        eventEnd: $eventEnd
        eventContent: $eventContent
        eventAllDay: $eventAllDay
      }
    ) {
      eventId
      eventTitle
    }
  }
`;
