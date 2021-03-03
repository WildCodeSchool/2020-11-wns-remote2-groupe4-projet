import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faDesktop,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';

import ChannelsListItemCpnt from '../channels-list-item-cpnt/ChannelsListItemCpnt';

export type ChannelsListCpntProps = {
  title: string;
  channels: string[];
  isRightAsideOpen: boolean;
};

const ChannelsListCpnt = ({
  title,
  channels,
  isRightAsideOpen,
}: ChannelsListCpntProps): JSX.Element => {
  const [isChannelsListOpen, setIsChannelsListOpen] = useState(false);

  const toggleChannelsList = (): void => {
    setIsChannelsListOpen(!isChannelsListOpen);
  };

  return (
    <div className="channels-list">
      <div
        className="cl-wrapper-title-icon"
        onClick={toggleChannelsList}
        role="wrapper-title-channels-list"
      >
        <button
          className={`cl-caret-icon ${
            isChannelsListOpen && 'cl-caret-icon-open'
          }`}
          role="caret-icon-wrapper-channels-list"
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
        {title == 'Général' ? (
          <div className="cl-title-icon">
            <FontAwesomeIcon icon={faDesktop} />
          </div>
        ) : (
          <div className="cl-title-icon">
            <FontAwesomeIcon icon={faMugHot} />
          </div>
        )}
        {isRightAsideOpen && <h4 className="cl-title">{title}</h4>}
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
