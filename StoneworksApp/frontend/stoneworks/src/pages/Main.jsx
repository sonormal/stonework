import React from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Offers from '../components/Offers';
import About from '../components/About';
import Footer from '../components/Footer';
import './Main.css'

function Main() {
    return (
        <div>
            <Header />
            <Home />
            <Offers />
            <About />
            <Footer />
        </div>
    );
}

export default Main;
