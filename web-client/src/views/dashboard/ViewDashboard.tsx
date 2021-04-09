import React, { useEffect, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../../contexts/UserContext';
import { AM_I_AUTHENTICATED } from '../../queries/userQueries';
import CalendarCtnr from '../../containers/calendar-ctnr/CalendarCtnr';
import CalendarEventFormCpnt from '../../components/calendar-event-form-cpnt/CalendarEventFormCpnt';

const ViewDashboard = (): JSX.Element => {
  const [isCalendarFormDisplayed, setIsCalendarFormDisplayed] = useState(false);
  const { loading, data } = useQuery(AM_I_AUTHENTICATED);
  const userLoggedIn = useContext(UserContext);

  useEffect(() => {
    if (data) {
      userLoggedIn.dispatch({
        type: 'USER_LOGGED_FETCH',
        userLoggedInDetails: data.amIAuthenticated,
      });
    }
  }, [data]);

  const displayCalendarForm = (): void => {
    setIsCalendarFormDisplayed(true);
  };

  const closeCalendarForm = (): void => {
    setIsCalendarFormDisplayed(false);
  };

  return (
    <div className="main-dashboard">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <CalendarCtnr />
          <div className="md-button-form-wrapper">
            <FontAwesomeIcon
              className={`mdbfw-close-form-button ${
                isCalendarFormDisplayed && 'button-active'
              }`}
              icon={faTimesCircle}
              onClick={closeCalendarForm}
            />
            <button
              className={`mdbfw-open-form-button ${
                !isCalendarFormDisplayed && 'button-active'
              }`}
              onClick={displayCalendarForm}
            >
              Créer un nouvel évènement
            </button>
            <CalendarEventFormCpnt
              closeCalendarForm={closeCalendarForm}
              isCalendarFormDisplayed={isCalendarFormDisplayed}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ViewDashboard;
