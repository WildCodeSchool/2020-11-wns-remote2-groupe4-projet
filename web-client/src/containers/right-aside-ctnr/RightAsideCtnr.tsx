import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ChannelsCtnr from '../channels-ctnr/ChannelsCtnr';
import UserContext from '../../contexts/UserContext';
import RightAsideCtnrContext from '../../contexts/RightAsideCtnrContext';

type RightAsideCtnrProps = {
  toggleRightAside: () => void;
  isRightAsideOpen: boolean;
};

const RightAsideCtnr = ({
  toggleRightAside,
  isRightAsideOpen,
}: RightAsideCtnrProps): JSX.Element => {
  const userLoggedIn = useContext(UserContext);
  const rightAsideCtnrContext = useContext(RightAsideCtnrContext);

  return (
    <aside
      className={`right-aside ${isRightAsideOpen && 'ra-visible'}
        ${
          rightAsideCtnrContext.rightAsideCtnrState.isRightAsideCtnrOpen &&
          'ra-mobile-visible'
        }`}
    >
      <FontAwesomeIcon
        className={`ra-arrow-left ${!isRightAsideOpen && 'rotate-right'}`}
        icon={faChevronRight}
        onClick={toggleRightAside}
        data-testid="ArrowIconRightAsideCtnr"
      />
      <h3 className={`ra-title ${!isRightAsideOpen && 'ra-title-mini'}`}>
        Chat
      </h3>
      {userLoggedIn.state.userLoggedInDetails && (
        <ChannelsCtnr
          isRightAsideOpen={isRightAsideOpen}
          toggleRightAside={toggleRightAside}
          user={userLoggedIn.state.userLoggedInDetails}
        />
      )}
    </aside>
  );
};

export default RightAsideCtnr;
