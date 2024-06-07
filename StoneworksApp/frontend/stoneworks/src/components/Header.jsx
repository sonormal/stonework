import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally validate the token with an API call here
      // Example:
      // axios.post('http://localhost:8080/api/auth/validate', { token })
      //   .then(response => {
      //     if (response.data.valid) {
      //       // Set user state based on token or API response
      //       setUser({ email: response.data.email, type: response.data.userType });
      //     } else {
      //       localStorage.removeItem('token');
      //     }
      //   });
      const userType = token.includes('admin') ? 'admin' : 'user';
      setUser({ email: 'user@example.com', type: userType }); // Update with actual user info
    }
  }, [setUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
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
