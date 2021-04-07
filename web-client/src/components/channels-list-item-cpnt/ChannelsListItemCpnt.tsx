import React from 'react';

import { Channel } from '../../interfaces/channelInterface';

export type ChannelsListItemCpntProps = {
  channel: Channel;
};

const ChannelsListItemCpnt = ({
  channel,
}: ChannelsListItemCpntProps): JSX.Element => {
  return <li className="channels-list-item">{channel.title}</li>;
};

export default ChannelsListItemCpnt;
