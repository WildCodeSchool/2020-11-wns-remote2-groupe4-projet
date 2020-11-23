import React from 'react';
import AvatarCpnt from '../../components/avatar-cpnt/AvatarCpnt';
import MenuCpnt from '../../components/menu-cpnt/MenuCpnt';
import MenuButtonCpnt from '../../components/menu-button-cpnt/MenuButtonCpnt';
const LeftAsideCtnr = (): JSX.Element => {
  return (
    <aside className="left-aside">
      <AvatarCpnt />
      <MenuCpnt />
      <MenuButtonCpnt />
    </aside>
  );
};

export default LeftAsideCtnr;
