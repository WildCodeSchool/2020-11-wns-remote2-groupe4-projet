import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarCtnr = (): JSX.Element => {
  return (
    <section className="calendar-section">
      <FullCalendar
        plugins={[dayGridPlugin]}
        locale="fr"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        droppable={true}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2021-04-27' },
          { title: 'event 2', date: '2021-27-04' },
        ]}
        //eventContent={{ html: '<i>some html</i>' }}
      />
    </section>
  );
};

export default CalendarCtnr;
