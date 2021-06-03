import { EventFormated } from '../interfaces/eventInterface';
import { CalendarAction } from '../actions/CalendarAction';

type CalendarState = {
  calendarEvents: EventFormated[];
};

const calendarReducer = (
  state: CalendarState,
  action: CalendarAction
): CalendarState => {
  switch (action.type) {
    case 'CALENDAR_ADD_EVENTS':
      return { ...state, calendarEvents: action.calendarEvents };
    case 'CALENDAR_EMPTY':
      return { calendarEvents: [] };
    default:
      return state;
  }
};

export default calendarReducer;
