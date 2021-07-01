import { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import UserContext from '../contexts/UserContext';
import { GET_EVENTS_CREATED_BY_USER_AUTHENTICATED } from '../queries/userQueries';
import {
  EventFromDataInterface,
  EventFormated,
} from '../interfaces/eventInterface';

const getEventsFormatted = (
  data: [EventFromDataInterface]
): EventFormated[] => {
  const formatedEventsArray = data.map((event) => {
    return {
      id: event.id,
      title: event.eventTitle,
      start: event.eventStart,
      end: event.eventEnd,
      allDay: event.eventAllDay,
      eventContent: event.eventContent,
    };
  });
  return formatedEventsArray;
};

type useDisplayCalendarEventsReturnType = {
  eventsArrayFormated: EventFormated[];
  loading: boolean;
  refetch: () => void;
};

export const useDisplayCalendarEvents = (): useDisplayCalendarEventsReturnType => {
  const userLoggedIn = useContext(UserContext);
  const [eventsArrayFormated, setEventsArrayFormated] = useState<
    EventFormated[]
  >([]);
  const { data, loading, refetch } = useQuery(
    GET_EVENTS_CREATED_BY_USER_AUTHENTICATED,
    {
      variables: { id: userLoggedIn.state.userLoggedInDetails?.id },
    }
  );

  useEffect(() => {
    if (data) {
      setEventsArrayFormated(getEventsFormatted(data.user.eventsCreatedByUser));
    }
  }, [data]);

  return { eventsArrayFormated, loading, refetch };
};
