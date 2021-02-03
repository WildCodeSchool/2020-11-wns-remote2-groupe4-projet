import React from 'react';

import ChannelsListCpnt from '../../components/channels-list-cpnt/ChannelsListCpnt';

export type ChannelsCtnrProps = {
  isRightAsideOpen: boolean;
};

const ChannelsCtnr = ({ isRightAsideOpen }: ChannelsCtnrProps): JSX.Element => {
  return (
    <div className="channels-ctnr">
      <ChannelsListCpnt
        title="Général"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
        isRightAsideOpen={isRightAsideOpen}
      />
      <ChannelsListCpnt
        title="Personnel"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
        isRightAsideOpen={isRightAsideOpen}
      />
    </div>
  );
};

export default ChannelsCtnr;
