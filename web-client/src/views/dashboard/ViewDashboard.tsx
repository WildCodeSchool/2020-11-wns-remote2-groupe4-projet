import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';

import UserContext from '../../contexts/UserContext';
import { AM_I_AUTHENTICATED } from '../../queries/userQueries';
import CalendarCtnr from '../../containers/calendar-ctnr/CalendarCtnr';

const ViewDashboard = (): JSX.Element => {
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

  return (
    <div className="main-dashboard">
      {loading ? <p>loading...</p> : <CalendarCtnr />}
    </div>
  );
};

export default ViewDashboard;
