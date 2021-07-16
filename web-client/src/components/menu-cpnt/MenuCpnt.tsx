import React from 'react';
import { Link } from 'react-router-dom';

interface MenuCpntProps {
  onItemClick?: () => void;
}

const MenuCpnt = ({ onItemClick }: MenuCpntProps): JSX.Element => {
  return (
    <nav className="menu">
      <div className="m-oblic-left"></div>
      <ul className="m-item-wrapper">
        <Link to="/dashboard">
          <li className="miw-item" onClick={onItemClick}>
            Dashboard
          </li>
        </Link>
        <li className="miw-item" onClick={onItemClick}>
          item2
        </li>
        <li className="miw-item" onClick={onItemClick}>
          item3
        </li>
        <li className="miw-item" onClick={onItemClick}>
          item4
        </li>
      </ul>
      <div className="m-oblic-right"></div>
    </nav>
  );
};
export default MenuCpnt;
