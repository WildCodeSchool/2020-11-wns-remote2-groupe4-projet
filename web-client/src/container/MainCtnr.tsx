import React from 'react';
import { RouteProps } from 'react-router-dom';

const MainCtnr = ({ children }: RouteProps): JSX.Element => {
  return (
    <main>
      <div>Bandeau gauche</div>
      {children}
      <div>Bandeau droit</div>
    </main>
  );
};

export default MainCtnr;
