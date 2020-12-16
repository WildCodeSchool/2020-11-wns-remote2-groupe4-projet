import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

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
  const [isChannelsListOpen, setIsChannelsListOpen] = useState(false);

  const toggleChannelsList = (): void => {
    setIsChannelsListOpen(!isChannelsListOpen);
  };

  return (
    <div className="channels-list">
      <div className="cl-wrapper-title-icon" onClick={toggleChannelsList}>
        <div
          className={`cl-caret-icon ${
            isChannelsListOpen && 'cl-caret-icon-open'
          }`}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
        <h4 className="cl-title">{title}</h4>
      </div>
      <ul className={`${!isChannelsListOpen && 'cl-ul-hidden'}`}>
        {channels.map((channel, index) => (
          // The key must be change by an channel.id when the db will be create
          <ChannelsListItemCpnt key={index} channel={channel} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsListCpnt;
