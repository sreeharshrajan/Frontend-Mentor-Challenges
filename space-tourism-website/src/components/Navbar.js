import '../styles/navbar.scss';
import useWindowWidth from '../hooks/useWindowWidth';
import NavLink from './NavLink';
import { useState } from 'react';

import logoSrc from '../assets/logo.svg';
import closeIconSrc from '../assets/icon-close.svg';
import menuIconSrc from '../assets/icon-hamburger.svg';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const windowWidth = useWindowWidth();
  const mobileWidth = 480;

  const menuIcon = (
    <img
      src={menuIconSrc}
      alt="close"
      className="menu-icon"
      onClick={toggleMenu}
    />
  );

  const closeIcon = (
    <img
      src={closeIconSrc}
      alt="close"
      className="close-menu-icon"
      onClick={toggleMenu}
    />
  );

  const navlinks = (
    <div className="navbar">
      {windowWidth < mobileWidth ? closeIcon : ''}
      <NavLink number="00" name="HOME" to="/" />
      <NavLink number="01" name="DESTINATION" to="/destinations" />
      <NavLink number="02" name="CREW" to="/crew" />
      <NavLink number="03" name="TECHNOLOGY" to="/technologies" />
    </div>
  );

  function toggleMenu() {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }

  return (
    <nav>
      <div className="logo">
        <img
          src={logoSrc}
          alt="logo" />
      </div>
      <div className="line"></div>
      {windowWidth > mobileWidth ? navlinks : showMenu ? navlinks : menuIcon}
    </nav>
  );
}

