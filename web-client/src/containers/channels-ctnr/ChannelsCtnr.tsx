import React from 'react';

import ChannelsListCpnt from '../../components/channels-list-cpnt/ChannelsListCpnt';
import useSubscribeToNewChannel from '../../hooks/useSubscribeToNewChannel';
import { userLoggedInProps } from '../../interfaces/userInterface';

export type ChannelsCtnrProps = {
  isRightAsideOpen: boolean;
  toggleRightAside: () => void;
  user: userLoggedInProps;
};

const ChannelsCtnr = ({
  isRightAsideOpen,
  toggleRightAside,
  user,
}: ChannelsCtnrProps): JSX.Element => {
  const { loading, error, data } = useSubscribeToNewChannel(user.id);

  return (
    <div className="channels-ctnr">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Erreur...</div>
      ) : (
        !!data && (
          <>
            <ChannelsListCpnt
              title="Public"
              channels={data.user.channels}
              isRightAsideOpen={isRightAsideOpen}
              toggleRightAside={toggleRightAside}
            />
          </>
        )
      )}
    </div>
  );
};

export default ChannelsCtnr;
