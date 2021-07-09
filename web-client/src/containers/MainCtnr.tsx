import React, { useContext, useState } from 'react';
import { RouteProps } from 'react-router-dom';

import LeftAsideCtnr from './left-aside-ctnr/LeftAsideCtnr';
import RightAsideCtnr from './right-aside-ctnr/RightAsideCtnr';
import HeaderMobileCtnr from './header-mobile-ctnr/HeaderMobileCtnr'
import ChannelMessagesCtnr from './channel-messages-ctnr/ChannelMessagesCtnr';
import ChannelContext from '../contexts/ChannelContext';
 
const MainCtnr = ({ children }: RouteProps): JSX.Element => {
  const channelContext = useContext(ChannelContext);
  const [isRightAsideOpen, setIsRightAsideOpen] = useState(true);

  const toggleRightAside = (): void => {
    setIsRightAsideOpen(!isRightAsideOpen);
  };

  return (
    <main className="main-ctrn">
      <HeaderMobileCtnr />
      <LeftAsideCtnr />
      {children}
      {channelContext.channelState.isChannelOpen && <ChannelMessagesCtnr isRightAsideOpen={isRightAsideOpen} />}
      <RightAsideCtnr toggleRightAside={toggleRightAside} isRightAsideOpen={isRightAsideOpen}/>
    </main>
  );
};

export default MainCtnr;
