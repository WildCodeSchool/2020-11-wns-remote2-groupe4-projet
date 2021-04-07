import React from 'react';

export type ChannelsListItemCpntProps = {
  channel: { id: string; title: string };
};

const ChannelsListItemCpnt = ({
  channel,
}: ChannelsListItemCpntProps): JSX.Element => {
  return <li className="channels-list-item">{channel.title}</li>;
};

export default ChannelsListItemCpnt;
