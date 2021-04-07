import React from 'react';

import ChannelsListCpnt from '../../components/channels-list-cpnt/ChannelsListCpnt';
import useSubscribeToNewChannel from '../../hooks/useSubscribeToNewChannel';

export type ChannelsCtnrProps = {
  isRightAsideOpen: boolean;
};

const ChannelsCtnr = ({ isRightAsideOpen }: ChannelsCtnrProps): JSX.Element => {
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
            />
          </>
        )
      )}
    </div>
  );
};

export default ChannelsCtnr;
