import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Wylogowanie użytkownika
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="menu-container">
      <Link to="/main"><img className="logo" src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" /></Link>
      <div className="menu-links">
        <Link to="/offers">Oferty</Link>
        <Link to="/contact">Kontakt</Link>
        {user ? (
          <Link to="/login" onClick={handleLogout}>Wyloguj</Link>
        ) : (
          <Link to="/login">Logowanie</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
  