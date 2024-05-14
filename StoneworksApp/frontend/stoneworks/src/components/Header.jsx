import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

function Header() {
  const user = useContext(UserContext);

  return (
    <div className="menu-container">
      <Link to="/main"><img className="logo" src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" /></Link>
      <div className="menu-links">
        <Link to="/offers">Oferty</Link>
        <Link to="/contact">Kontakt</Link>
        {user ? (
          <Link to="/logout">Wyloguj</Link>
        ) : (
          <Link to="/login">Logowanie</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
