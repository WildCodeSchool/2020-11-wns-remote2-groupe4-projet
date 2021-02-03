import React from 'react';

export type ChannelsListItemCpntProps = {
  channel: string;
};

const ChannelsListItemCpnt = ({
  channel,
}: ChannelsListItemCpntProps): JSX.Element => {
  return <div className="channels-list-item">{channel}</div>;
};

export default ChannelsListItemCpnt;
