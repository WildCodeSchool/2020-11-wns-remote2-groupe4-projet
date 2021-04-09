import React, { useEffect, useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@apollo/client';

import UserContext from '../../contexts/UserContext';
import { GET_EVENTS_CREATED_BY_USER_AUTHENTICATED } from '../../queries/userQueries';
import {
  EventFromDataInterface,
  EventFormated,
} from '../../interfaces/eventInterface';

const eventsArray = (data: [EventFromDataInterface]): EventFormated[] => {
  const formatedEventsArray: EventFormated[] = [];
  data.forEach((event) => {
    const eventFormatted = {
      title: event.eventTitle,
      start: event.eventStart,
      end: event.eventEnd,
      allDay: event.eventAllDay,
    };
    formatedEventsArray.push(eventFormatted);
  });
  return formatedEventsArray;
};

const CalendarCtnr = (): JSX.Element => {
  const userLoggedIn = useContext(UserContext);
  const [eventsArrayFormated, setEventsArrayFormated] = useState<
    EventFormated[]
  >([]);
  const { data } = useQuery(GET_EVENTS_CREATED_BY_USER_AUTHENTICATED, {
    variables: { id: userLoggedIn.state.userLoggedInDetails?.id },
  });

  useEffect(() => {
    if (data)
      setEventsArrayFormated(eventsArray(data.user.eventsCreatedByUser));
  }, [data]);
  return (
    <section className="calendar-section">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="fr"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        droppable={true}
        initialView="dayGridMonth"
        weekends={true}
        editable={true}
        events={eventsArrayFormated}
        //eventContent={{ html: '<i>some html</i>' }}
      />
    </section>
  );
};

export default CalendarCtnr;
