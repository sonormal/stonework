import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Offers from './pages/Offers'; 
import Header from './components/Header';
import Registration from './pages/Registration';
import { UserProvider } from './context/UserContext';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/main" element={<Main />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registration" element={<Registration />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
