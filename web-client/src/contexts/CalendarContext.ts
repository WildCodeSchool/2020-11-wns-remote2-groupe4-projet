import { createContext, Dispatch } from 'react';
import { EventFormated } from '../interfaces/eventInterface';
import { CalendarAction } from '../actions/CalendarAction';

export type CalendarInitialState = {
  calendarEvents: EventFormated[];
};

export const calendarInitialState = {
  calendarEvents: [],
};

const CalendarContext = createContext<{
  calendarState: CalendarInitialState;
  calendarDispatch: Dispatch<CalendarAction>;
}>({ calendarState: calendarInitialState, calendarDispatch: () => [] });
export default CalendarContext;
