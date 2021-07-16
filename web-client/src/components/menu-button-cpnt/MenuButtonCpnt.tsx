import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import { DELETE_SESSION } from '../../queries/sessionQueries';

type MenuButtonProps = {
  isLeftAsideOpen: boolean;
  onItemClick?: () => void;
};

const MenuButtonCpnt = ({
  isLeftAsideOpen,
  onItemClick,
}: MenuButtonProps): JSX.Element => {
  const [deleteSession] = useMutation(DELETE_SESSION);

  const history = useHistory();

  const logoutClick = async () => {
    try {
      await deleteSession();
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`btn-wrapper ${!isLeftAsideOpen && 'btn-wrapper-column'}`}>
      <Link to="parameters">
        <button className="menu-btn parameters" onClick={onItemClick}>
          <FontAwesomeIcon className="mb-icon" icon={faCog} />
        </button>
      </Link>
      <button className="menu-btn deconnexion" onClick={logoutClick}>
        <FontAwesomeIcon className="mb-icon" icon={faPowerOff} />
      </button>
    </div>
  );
};

export default MenuButtonCpnt;
