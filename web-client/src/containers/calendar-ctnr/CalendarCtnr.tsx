import React from 'react';
import FullCalendar, { EventDropArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMutation } from '@apollo/client';

import { useDisplayCalendarEvents } from '../../hooks/calendarHooks';
import { UPDATE_EVENT_BY_ID } from '../../queries/calendarEventQueries';

const CalendarCtnr = (): JSX.Element => {
  const { eventsArrayFormated, loading } = useDisplayCalendarEvents();
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

  return (
    <section className="calendar-section">
      {loading ? (
        <p>Loading...</p>
      ) : (
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
          handleWindowResize={true}
        />
      )}
    </section>
  );
};

export default CalendarCtnr;
