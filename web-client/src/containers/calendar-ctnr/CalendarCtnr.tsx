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
    };
  });
  return formatedEventsArray;
};

const eventDatasOnDragStop = (eventInfo: any) => {
  console.log('dragStop : ', eventInfo);
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
      setEventsArrayFormated(getEventsFormatted(data.user.eventsCreatedByUser));
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
        editable={true}
        droppable={true}
        initialView="dayGridMonth"
        weekends={false}
        events={eventsArrayFormated}
        eventDrop={eventDatasOnDragStop}
      />
    </section>
  );
};

export default CalendarCtnr;
