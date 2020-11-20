import React from 'react';
import { RouteProps } from 'react-router-dom';
import LeftAsideCtnr from './left-aside-ctnr/LeftAsideCtnr';

const MainCtnr = ({ children }: RouteProps): JSX.Element => {
  return (
    <main className="main-ctrn">
      <LeftAsideCtnr />
      {children}
      <div>Bandeau droit</div>
    </main>
  );
};

export default MainCtnr;
