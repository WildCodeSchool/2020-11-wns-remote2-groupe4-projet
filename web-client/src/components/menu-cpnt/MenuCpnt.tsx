import React from 'react';

const MenuCpnt = (): JSX.Element => {
  return (
    <nav className="menu">
      <div className="m-oblic-left"></div>
      <ul className="m-item-wrapper">
        <li className="miw-item">item1</li>
        <li className="miw-item">item2</li>
        <li className="miw-item">item3</li>
        <li className="miw-item">item4</li>
      </ul>
      <div className="m-oblic-right"></div>
    </nav>
  );
};
export default MenuCpnt;
