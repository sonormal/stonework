import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <h1 className="header-text">Najlepszy zakład kamieniarski w mieście</h1>
          <Link to="/contact">
            <button className="contact-button">Skontaktuj się z nami</button>
          </Link>
        </div>
        <img className="home-image" src={`${process.env.PUBLIC_URL}/img/marmur.jpg`} alt="Marmur" />
      </div>
    </div>
  );
}

export default Home;
