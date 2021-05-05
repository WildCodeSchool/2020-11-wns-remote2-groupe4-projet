import React, { useContext } from 'react';
import ChannelContext from '../../contexts/ChannelContext';

import { Channel } from '../../interfaces/channelInterface';

export type ChannelsListItemCpntProps = {
  channel: Channel;
  toggleRightAside: () => void;
};

const ChannelsListItemCpnt = ({
  channel,
  toggleRightAside,
}: ChannelsListItemCpntProps): JSX.Element => {
  const channelContext = useContext(ChannelContext);

  const onSetCurrentChannel = () => {
    channelContext.channelDispatch({
      type: 'SET_CURRENT_CHANNEL',
      currentChannel: channel,
      isChannelOpen: true,
    });

    if (window.innerWidth <= 760) {
      toggleRightAside();
    }
  };

  return (
    <li className="channels-list-item">
      <button className="cl-button" onClick={onSetCurrentChannel}>
        <p>{channel.title}</p>
      </button>
    </li>
  );
};

export default ChannelsListItemCpnt;
