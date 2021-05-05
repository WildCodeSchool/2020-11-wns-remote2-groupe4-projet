import React from 'react';

import ChannelsListCpnt from '../../components/channels-list-cpnt/ChannelsListCpnt';
import useSubscribeToNewChannel from '../../hooks/useSubscribeToNewChannel';

export type ChannelsCtnrProps = {
  isRightAsideOpen: boolean;
  toggleRightAside: () => void;
};

const ChannelsCtnr = ({
  isRightAsideOpen,
  toggleRightAside,
}: ChannelsCtnrProps): JSX.Element => {
  const { loading, error, data } = useSubscribeToNewChannel();

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
