import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Offers from './pages/Offers'; 
import Header from './components/Header';
import Registration from './pages/Registration';
import Admin from './pages/Admin';
import { UserProvider } from './context/UserContext';
import UserContext from './context/UserContext';

const PrivateRoute = ({ children, role, ...rest }) => {
    const { user } = useContext(UserContext);
    if (!user || user.type !== role) {
        return <Navigate to="/login" />;
    }
    return children;
};

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
                    <Route path="/admin" element={
                        <PrivateRoute role="admin">
                            <Admin />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
