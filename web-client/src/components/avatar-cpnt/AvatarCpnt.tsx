import React from 'react';

const AvatarCpnt = (): JSX.Element => {
  return (
    <div className="avatar">
      <img
        className="a-image"
        src="https://directemployers.org/wp-content/uploads/2018/08/avatar-JohnDoe.jpg"
        alt=""
      ></img>
      <h3 className="a-name">John Doe</h3>
    </div>
  );
};

export default AvatarCpnt;
