import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { CREATE_NEW_EVENT } from '../../queries/calendarEventQueries';

type CalendarEventFormCpntProps = {
  closeCalendarForm: () => void;
};

type CalendarFormData = {
  eventAllDay: boolean;
  eventContent: string;
  eventStart: Date;
  eventStartTime: Date;
  eventEnd: Date;
  eventEndTime: Date;
  eventTitle: string;
};

const CalendarEventFormCpnt = ({
  closeCalendarForm,
}: CalendarEventFormCpntProps): JSX.Element => {
  const { register, handleSubmit } = useForm<CalendarFormData>({});
  const [createCalendarEvent] = useMutation(CREATE_NEW_EVENT);

  const submitNewEvent = handleSubmit(
    async ({
      eventTitle,
      eventStart,
      eventStartTime,
      eventEnd,
      eventEndTime,
      eventAllDay,
      eventContent,
    }) => {
      try {
        await createCalendarEvent({
          variables: {
            eventTitle,
            eventStart: `${eventStart} ${eventStartTime}`,
            eventEnd: `${eventEnd} ${eventEndTime}`,
            eventAllDay,
            eventContent,
          },
        });
        closeCalendarForm();
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <form className="calendar-form" onSubmit={submitNewEvent}>
      <FontAwesomeIcon icon={faTimesCircle} onClick={closeCalendarForm} />
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
        <div className="cfic-box">
          <label htmlFor="event-start-date" className="cficb-label">
            Date de début
          </label>
          <div className="cficb-box-child">
            <input
              type="date"
              name="eventStart"
              className="cficbc-input"
              ref={register({ required: true })}
              id="event-start-date"
              aria-label="event start date"
            />
            <input
              type="time"
              name="eventStartTime"
              className="cficbc-input"
              ref={register({ required: true })}
              id="event-start-date-time"
              aria-label="event start date time"
            />
          </div>
        </div>
      </div>
      <div className="cf-input-container">
        <div className="cfic-box">
          <label htmlFor="event-end-date" className="cfic-label">
            Date de fin
          </label>
          <div className="cficb-box-child">
            <input
              type="date"
              name="eventEnd"
              className="cfic-input"
              ref={register({ required: true })}
              id="event-end-date"
              aria-label="event end date"
            />
            <input
              type="time"
              name="eventEndTime"
              className="cfic-input"
              ref={register({ required: true })}
              id="event-end-date-time"
              aria-label="event end date time"
            />
          </div>
        </div>
      </div>
      <div className="cf-input-container checkbox-container">
        <input
          type="checkbox"
          name="eventAllDay"
          className="cfic-input cfic-checkbox"
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
