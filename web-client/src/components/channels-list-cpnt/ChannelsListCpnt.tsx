import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faDesktop,
  faMugHot,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import ChannelsListItemCpnt from '../channels-list-item-cpnt/ChannelsListItemCpnt';
import { Channel } from '../../interfaces/channelInterface';
import AddChannelModalCpnt from '../../components/add-channel-modal/AddChannelModalCpnt';

export type ChannelsListCpntProps = {
  title: string;
  channels: Channel[];
  isRightAsideOpen: boolean;
  toggleRightAside: () => void;
};

const ChannelsListCpnt = ({
  title,
  channels,
  isRightAsideOpen,
  toggleRightAside,
}: ChannelsListCpntProps): JSX.Element => {
  const [isChannelsListOpen, setIsChannelsListOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleChannelsList = (): void => {
    setIsChannelsListOpen(!isChannelsListOpen);
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  return (
    <div className="channels-list">
      <div className="cl-wrapper-header">
        <div
          className="cl-wrapper-title-icon"
          role="wrapper-title-channels-list"
          onClick={toggleChannelsList}
        >
          <button
            className={`cl-caret-icon ${
              isChannelsListOpen && 'cl-caret-icon-open'
            }`}
            role="caret-icon-wrapper-channels-list"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          {title === 'Public' ? (
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
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <ul className={`cl-ul ${!isChannelsListOpen && 'cl-ul-hidden'}`}>
        {channels.map((channel) => (
          <ChannelsListItemCpnt
            key={channel.id}
            channel={channel}
            toggleRightAside={toggleRightAside}
          />
        ))}
      </ul>
      <AddChannelModalCpnt
        isOpen={isModalOpen}
        title="Ajouter un channel"
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ChannelsListCpnt;
