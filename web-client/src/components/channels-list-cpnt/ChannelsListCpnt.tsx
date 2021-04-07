import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faDesktop,
  faMugHot,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';

import ChannelsListItemCpnt from '../channels-list-item-cpnt/ChannelsListItemCpnt';

export type ChannelsListCpntProps = {
  title: string;
  channels: { id: string; title: string }[];
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
      <div className="cl-wrapper-header" role="wrapper-title-channels-list">
        <div className="cl-wrapper-title-icon" onClick={toggleChannelsList}>
          <button
            className={`cl-caret-icon ${
              isChannelsListOpen && 'cl-caret-icon-open'
            }`}
            role="caret-icon-wrapper-channels-list"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          {title == 'Public' ? (
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
        <div className="cl-wrapper-plus-icon">
          <button
            className="cl-plus-icon"
            role="plus-icon-wrapper-channels-list"
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
      </div>
      <ul className={`cl-ul ${!isChannelsListOpen && 'cl-ul-hidden'}`}>
        {channels.map((channel) => (
          <ChannelsListItemCpnt key={channel.id} channel={channel} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsListCpnt;
