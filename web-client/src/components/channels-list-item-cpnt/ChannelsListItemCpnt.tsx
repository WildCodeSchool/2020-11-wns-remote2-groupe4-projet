import React from 'react';

import './ChannelsListItemCpnt.scss';

export type ChannelsListItemCpntProps = {
  channel: string;
};

const ChannelsListItemCpnt = ({
  channel,
}: ChannelsListItemCpntProps): JSX.Element => {
  return <div className="channels-list-item">{channel}</div>;
};

export default ChannelsListItemCpnt;
