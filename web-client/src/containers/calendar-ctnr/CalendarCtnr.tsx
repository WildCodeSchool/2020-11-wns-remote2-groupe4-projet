import React, { useEffect, useState, useContext } from 'react';
import FullCalendar, { EventDropArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation } from '@apollo/client';

import UserContext from '../../contexts/UserContext';
import { GET_EVENTS_CREATED_BY_USER_AUTHENTICATED } from '../../queries/userQueries';
import { UPDATE_EVENT_BY_ID } from '../../queries/calendarEventQueries';
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

const CalendarCtnr = (): JSX.Element => {
  const userLoggedIn = useContext(UserContext);
  const [eventsArrayFormated, setEventsArrayFormated] = useState<
    EventFormated[]
  >([]);

  const { data } = useQuery(GET_EVENTS_CREATED_BY_USER_AUTHENTICATED, {
    variables: { id: userLoggedIn.state.userLoggedInDetails?.id },
  });

  const [updateCalendarEvent] = useMutation(UPDATE_EVENT_BY_ID);

  const eventDatasOnDragStop = async (eventInfo: EventDropArg) => {
    const eventUpdated = eventInfo.event;

    await updateCalendarEvent({
      variables: {
        id: eventUpdated._def.publicId,
        eventStart: eventUpdated._instance?.range.start,
        eventEnd: eventUpdated._instance?.range.start,
      },
    });
  };

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
