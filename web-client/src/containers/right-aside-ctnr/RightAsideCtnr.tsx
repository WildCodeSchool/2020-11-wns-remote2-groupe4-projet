import React from 'react';

import './RightAsideCtnr.scss';

import ChatSearchBar from '../../components/chat-searchbar-cpnt/ChatSearchBar';

import ChannelsCtnr from '../channels-ctnr/ChannelsCtnr';

const RightAsideCtnr = (): JSX.Element => {
  return (
    <aside className="right-aside">
      <h3 className="right_aside_title">Chat</h3>
      <ChatSearchBar />
      <ChannelsCtnr />
    </aside>
  );
};

export default RightAsideCtnr;
