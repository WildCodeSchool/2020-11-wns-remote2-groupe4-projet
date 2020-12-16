import React from 'react';

type MenuButtonProps = {
  isLeftAsideOpen: boolean;
};

const MenuButtonCpnt = ({ isLeftAsideOpen }: MenuButtonProps): JSX.Element => {
  return (
    <div className={`btn-wrapper ${!isLeftAsideOpen && 'btn-wrapper-column'}`}>
      <button className="menu-btn parameters">Paramètres</button>
      <button className="menu-btn deconnexion">Déconnexion</button>
    </div>
  );
};

export default MenuButtonCpnt;
