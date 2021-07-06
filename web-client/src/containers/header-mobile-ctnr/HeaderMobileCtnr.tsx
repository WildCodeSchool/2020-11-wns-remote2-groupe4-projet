import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import MenuButtonCpnt from '../../components/menu-button-cpnt/MenuButtonCpnt';
import MenuCpnt from '../../components/menu-cpnt/MenuCpnt';

const HeaderMobileCtnr = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMenuMobileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onBurgerClick = () => {
    setIsMenuMobileOpen(!isMobileMenuOpen);
  }

  const onChatClick = () => {
    setIsChatOpen(!isChatOpen);
  }

  return (
    <>
      <header className="header-mobile">
        <div className={`hm-burger ${isMobileMenuOpen && "burger-cross"}`} onClick={onBurgerClick}>
          <span className="hmb-line"></span>
          <span className="hmb-line"></span>
          <span className="hmb-line"></span>
        </div>

        <Avatar />

        <button className="hm-chat-button" onClick={onChatClick}>Chat</button>
      </header>
      <div className={`menu-mobile ${!isMobileMenuOpen && "menu-mobile-close"}`}>
        <MenuCpnt />
        <MenuButtonCpnt isLeftAsideOpen={false} />
      </div>
    </>
  )
}

export default HeaderMobileCtnr;