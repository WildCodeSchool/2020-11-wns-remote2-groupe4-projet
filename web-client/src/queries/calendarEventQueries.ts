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
