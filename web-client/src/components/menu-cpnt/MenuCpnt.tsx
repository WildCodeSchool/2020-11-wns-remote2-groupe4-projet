import React from 'react';
import { Link } from 'react-router-dom'

const MenuCpnt = (): JSX.Element => {
  return (
    <nav className="menu">
      <div className="m-oblic-left"></div>
      <ul className="m-item-wrapper">
        <Link to="/dashboard"><li className="miw-item">Dashboard</li></Link>
        <li className="miw-item">item2</li>
        <li className="miw-item">item3</li>
        <li className="miw-item">item4</li>
      </ul>
      <div className="m-oblic-right"></div>
    </nav>
  );
};
export default MenuCpnt;
