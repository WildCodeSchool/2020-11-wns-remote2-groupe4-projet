import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';

import UserContext from '../../contexts/UserContext';

import { AM_I_AUTHENTICATED } from '../../queries/userQueries';

const ViewDashboard = (): JSX.Element => {
  const { loading, data } = useQuery(AM_I_AUTHENTICATED);
  const userLoggedIn = useContext(UserContext);

  useEffect(() => {
    if (data) {
      userLoggedIn.dispatch({
        type: 'USER_FETCHED',
        userLoggedIn: data.amIAuthenticated,
      });
    }
  }, [data]);

  return <div>{loading ? <p>loading...</p> : <p>ViewDashboard</p>}</div>;
};

export default ViewDashboard;
