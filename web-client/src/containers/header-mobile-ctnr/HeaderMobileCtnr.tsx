import { Avatar } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import RightAsideCtnrContext from '../../contexts/RightAsideCtnrContext';
import MenuButtonCpnt from '../../components/menu-button-cpnt/MenuButtonCpnt';
import MenuCpnt from '../../components/menu-cpnt/MenuCpnt';

const HeaderMobileCtnr = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMenuMobileOpen] = useState<boolean>(false);
  const rightAsideCtnrContext = useContext(RightAsideCtnrContext);

  const onBurgerClick = (): void => {
    setIsMenuMobileOpen(!isMobileMenuOpen);
  };

  const onChatClick = () => {
    rightAsideCtnrContext.rightAsideCtnrDispatch({
      type: 'TOGGLE_RIGHT_ASIDE_CTNR',
      isRightAsideCtnrOpen: true,
    });
  };

  return (
    <>
      <header className="header-mobile">
        <div
          className={`hm-burger ${isMobileMenuOpen && 'burger-cross'}`}
          onClick={onBurgerClick}
        >
          <span className="hmb-line"></span>
          <span className="hmb-line"></span>
          <span className="hmb-line"></span>
        </div>

        <Avatar />

        <button className="hm-chat-button" onClick={onChatClick}>
          <FontAwesomeIcon
            className={`hmcb-icon ${
              rightAsideCtnrContext.rightAsideCtnrState.isRightAsideCtnrOpen &&
              'icon-active'
            }`}
            icon={faCommentDots}
          />
        </button>
      </header>
      <div
        className={`menu-mobile ${!isMobileMenuOpen && 'menu-mobile-close'}`}
      >
        <MenuCpnt onItemClick={onBurgerClick} />
        <MenuButtonCpnt isLeftAsideOpen={false} onItemClick={onBurgerClick} />
      </div>
    </>
  );
};

export default HeaderMobileCtnr;
