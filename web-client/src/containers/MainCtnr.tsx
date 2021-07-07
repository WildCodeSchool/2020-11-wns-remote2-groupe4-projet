import React from 'react';
import { RouteProps } from 'react-router-dom';

import LeftAsideCtnr from './left-aside-ctnr/LeftAsideCtnr';
import RightAsideCtnr from './right-aside-ctnr/RightAsideCtnr';
import HeaderMobileCtnr from './header-mobile-ctnr/HeaderMobileCtnr'
 
const MainCtnr = ({ children }: RouteProps): JSX.Element => {
  return (
    <main className="main-ctrn">
      <HeaderMobileCtnr />
      <LeftAsideCtnr />
      {children}
      <RightAsideCtnr />
    </main>
  );
};

export default MainCtnr;
