import React from 'react';

const MenuButtonCpnt = (): JSX.Element => {
  return (
    <div className="btn-wrapper">
      <button className="menu-btn parameters">Paramètres</button>
      <button className="menu-btn deconnexion">Déconnexion</button>
    </div>
  );
};

export default MenuButtonCpnt;
