import { EventFormated } from '../interfaces/eventInterface';

export type CalendarAction =
  | { type: 'CALENDAR_ADD_EVENTS'; calendarEvents: EventFormated[] }
  | { type: 'CALENDAR_EMPTY'; calendarEvents: [] };
