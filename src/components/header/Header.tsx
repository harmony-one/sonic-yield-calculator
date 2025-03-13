import React from 'react';
import { NavLink } from 'react-router-dom';
import { ConnectKitButton } from "connectkit";
import './Header.styles.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__menu">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `header__menu-item ${isActive ? 'active' : ''}`
            }
          >
            Pools
          </NavLink>
          <NavLink 
            to="positions" 
            className={({ isActive }) => 
              `header__menu-item ${isActive ? 'active' : ''}`
            }
          >
            My Positions
          </NavLink>
        </div>
        
        <div className="header__actions">
          <ConnectKitButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;