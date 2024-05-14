import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text">
        © 2023 Stoneworks. Wszelkie prawa zastrzeżone.
        <Link to="/privacy-policy">Privacy policy</Link> |
        <Link to="/terms-conditions">Terms and conditions</Link>
      </div>
    </footer>
  );
}

export default Footer;
