import React from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { DELETE_SESSION } from '../../queries/sessionQueries';

type MenuButtonProps = {
  isLeftAsideOpen: boolean;
};

const MenuButtonCpnt = ({ isLeftAsideOpen }: MenuButtonProps): JSX.Element => {
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
      <button className="menu-btn parameters">Paramètres</button>
      <button className="menu-btn deconnexion" onClick={logoutClick}>
        Déconnexion
      </button>
    </div>
  );
};

export default MenuButtonCpnt;
