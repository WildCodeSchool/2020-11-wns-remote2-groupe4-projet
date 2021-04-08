import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';

import { CREATE_NEW_EVENT } from '../../queries/calendarEventQueries';

type CalendarFormData = {
  eventAllDay: boolean;
  eventContent: string;
  eventStart: Date;
  eventEnd: Date;
  eventTitle: string;
};

const CalendarEventFormCpnt = (): JSX.Element => {
  const { register, handleSubmit } = useForm<CalendarFormData>({});
  const [createCalendarEvent] = useMutation(CREATE_NEW_EVENT);

  const submitNewEvent = handleSubmit(
    async ({ eventTitle, eventStart, eventEnd, eventAllDay, eventContent }) => {
      console.log({
        eventTitle,
        eventStart,
        eventEnd,
        eventAllDay,
        eventContent,
      });
      try {
        await createCalendarEvent({
          variables: {
            eventTitle,
            eventStart,
            eventEnd,
            eventAllDay,
            eventContent,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <form className="calendar-form" onSubmit={submitNewEvent}>
      <h2 className="cf-title">Créez un nouvel évènement</h2>
      <div className="cf-input-container">
        <label htmlFor="event-title" className="cfic-label">
          Titre de l&apos;évènement
        </label>
        <input
          type="text"
          name="eventTitle"
          className="cfic-input"
          ref={register({ required: true })}
          id="event-title"
          aria-label="title"
        />
      </div>
      <div className="cf-input-container">
        <label htmlFor="event-start-date" className="cfic-label">
          Date de début
        </label>
        <input
          type="date"
          name="eventStart"
          className="cfic-input"
          ref={register({ required: true })}
          id="event-start-date"
          aria-label="event start date"
        />
      </div>
      <div className="cf-input-container">
        <label htmlFor="event-end-date" className="cfic-label">
          Date de fin
        </label>
        <input
          type="date"
          name="eventEnd"
          className="cfic-input"
          ref={register({ required: true })}
          id="event-end-date"
          aria-label="event end date"
        />
      </div>
      <div className="cf-input-container checkbox-container">
        <input
          type="checkbox"
          name="eventAllDay"
          className="cfic-input"
          ref={register()}
          id="event-all-day"
          aria-label="event all day"
        />
        <label htmlFor="event-all-day" className="cfic-label">
          Jour entier
        </label>
      </div>
      <div className="cf-input-container">
        <label htmlFor="event-content" className="cfic-label">
          Contenu
        </label>
        <input
          type="text"
          name="eventContent"
          className="cfic-input"
          ref={register({ required: true })}
          id="event-content"
          aria-label="event content"
        />
      </div>
      <div className="cf-input-container">
        <input type="submit" className="cfic-submit" />
      </div>
    </form>
  );
};
export default CalendarEventFormCpnt;
