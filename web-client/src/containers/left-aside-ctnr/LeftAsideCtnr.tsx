import React, { useState } from 'react';
import AvatarCpnt from '../../components/avatar-cpnt/AvatarCpnt';
import MenuCpnt from '../../components/menu-cpnt/MenuCpnt';
import MenuButtonCpnt from '../../components/menu-button-cpnt/MenuButtonCpnt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftAsideCtnr = (): JSX.Element => {
  const [isLeftAsideOpen, setIsLeftAsideOpen] = useState(true);

  const handlLeftAside = (): void => {
    setIsLeftAsideOpen(!isLeftAsideOpen);
  };

  return (
    <aside className={`left-aside ${isLeftAsideOpen && 'visible'}`}>
      <FontAwesomeIcon
        className={`la-arrow-right ${!isLeftAsideOpen && 'rotate-left'}`}
        icon={faArrowCircleLeft}
        onClick={handlLeftAside}
      />
      <AvatarCpnt isLeftAsideOpen={isLeftAsideOpen} />
      <MenuCpnt />
      <MenuButtonCpnt isLeftAsideOpen={isLeftAsideOpen} />
    </aside>
  );
};

export default LeftAsideCtnr;
