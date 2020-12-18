import React from 'react';

type AvatarProps = {
  isLeftAsideOpen: boolean;
};

const AvatarCpnt = ({ isLeftAsideOpen }: AvatarProps): JSX.Element => {
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
        John Doe
      </h3>
    </div>
  );
};

export default AvatarCpnt;
