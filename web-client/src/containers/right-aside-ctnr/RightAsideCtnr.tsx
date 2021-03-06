import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import ChatSearchBar from '../../components/chat-searchbar-cpnt/ChatSearchBar';
import ChannelsCtnr from '../channels-ctnr/ChannelsCtnr';

const RightAsideCtnr = (): JSX.Element => {
  const [isRightAsideOpen, setIsRightAsideOpen] = useState(true);

  const toggleRightAside = (): void => {
    setIsRightAsideOpen(!isRightAsideOpen);
  };

  return (
    <aside className={`right-aside ${isRightAsideOpen && 'ra-visible'}`}>
      <FontAwesomeIcon
        className={`ra-arrow-left ${!isRightAsideOpen && 'rotate-right'}`}
        icon={faArrowCircleRight}
        onClick={toggleRightAside}
        data-testid="ArrowIconRightAsideCtnr"
      />
      <h3 className={`ra-title ${!isRightAsideOpen && 'ra-title-mini'}`}>
        Chat
      </h3>
      {isRightAsideOpen && <ChatSearchBar />}
      <ChannelsCtnr
        isRightAsideOpen={isRightAsideOpen}
        toggleRightAside={toggleRightAside}
      />
    </aside>
  );
};

export default RightAsideCtnr;
