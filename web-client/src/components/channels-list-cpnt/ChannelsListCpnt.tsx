import React from 'react';

import './ChannelsListCpnt.scss';

import ChannelsListItemCpnt from '../channels-list-item-cpnt/ChannelsListItemCpnt';

export type ChannelsListCpntProps = {
  title: string;
  channels: string[];
};

const ChannelsListCpnt = ({
  title,
  channels,
}: ChannelsListCpntProps): JSX.Element => {
  return (
    <div className="channels-list">
      <h4 className="cl-title">{title}</h4>
      <ul>
        {channels.map((channel, index) => (
          // The key must be change by an channel.id when the db will be create
          <ChannelsListItemCpnt key={index} channel={channel} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsListCpnt;
