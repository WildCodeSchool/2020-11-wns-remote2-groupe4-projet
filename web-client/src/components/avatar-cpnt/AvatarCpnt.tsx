import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
type AvatarProps = {
  isLeftAsideOpen: boolean;
};

const AvatarCpnt = ({ isLeftAsideOpen }: AvatarProps): JSX.Element => {
  const userLoggedIn = useContext(UserContext);

  return (
    <div className="avatar">
      <img
        className={`a-image ${!isLeftAsideOpen && 'a-image-small'}`}
        src="https://directemployers.org/wp-content/uploads/2018/08/avatar-JohnDoe.jpg"
        alt="avatar"
      ></img>
      <h3
        data-testid="avatar-name"
        className={`a-name ${!isLeftAsideOpen && 'hide-name'}`}
      >
        {`${userLoggedIn.state.userLoggedInDetails?.firstname}
        ${userLoggedIn.state.userLoggedInDetails?.lastname}`}
      </h3>
    </div>
  );
};

export default AvatarCpnt;
