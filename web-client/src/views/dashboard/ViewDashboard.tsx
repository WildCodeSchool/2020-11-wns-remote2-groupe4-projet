import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';

import UserContext from '../../contexts/UserContext';

import { AM_I_AUTHENTICATED } from '../../queries/userQueries';
import ChannelMessagesCtnr from '../../containers/channel-messages-ctnr/ChannelMessagesCtnr';
import ChannelContext from '../../contexts/ChannelContext';

const ViewDashboard = (): JSX.Element => {
  const { loading, data } = useQuery(AM_I_AUTHENTICATED);
  const userLoggedIn = useContext(UserContext);
  const channelContext = useContext(ChannelContext);

  useEffect(() => {
    if (data) {
      userLoggedIn.dispatch({
        type: 'USER_LOGGED_FETCH',
        userLoggedInDetails: data.amIAuthenticated,
      });
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="viewdashboard">
          ViewDashboard
          {channelContext.channelState.isChannelOpen && <ChannelMessagesCtnr />}
        </div>
      )}
    </div>
  );
};

export default ViewDashboard;
