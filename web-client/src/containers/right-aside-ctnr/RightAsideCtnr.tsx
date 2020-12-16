import React from 'react';

import './RightAsideCtnr.scss';

import ChannelsCtnr from '../channels-ctnr/ChannelsCtnr';

const RightAsideCtnr = (): JSX.Element => {
  return (
    <aside className="right-aside">
      <h3 className="right_aside_title">Chat</h3>
      <ChannelsCtnr />
    </aside>
  );
};

export default RightAsideCtnr;
