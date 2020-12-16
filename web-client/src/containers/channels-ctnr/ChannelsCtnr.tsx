import React from 'react';

import './ChannelsCtnr.scss';

import ChannelsListCpnt from '../../components/channels-list-cpnt/ChannelsListCpnt';

const ChannelsCtnr = (): JSX.Element => {
  return (
    <div className="channels-ctnr">
      <ChannelsListCpnt
        title="Général"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
      />
      <ChannelsListCpnt
        title="Personnel"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
      />
    </div>
  );
};

export default ChannelsCtnr;
