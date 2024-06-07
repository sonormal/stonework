import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import UserContext from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            if (response.status === 200) {
                const token = response.data.token;
                const userType = response.data.userType;
                localStorage.setItem('token', token); // Store the token in localStorage
                setUser({ email, type: userType });
                console.log(`Logged in as ${userType}`);
                if (userType === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/main');
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessages(['Email lub hasło zostały źle wprowadzone']);
                } else {
                    setMessages(['Wystąpił błąd podczas logowania: ' + error.response.data]);
                }
            } else if (error.request) {
                setMessages(['Brak odpowiedzi z serwera']);
            } else {
                setMessages(['Wystąpił błąd podczas logowania']);
            }
        }
    };

    const handleRegister = () => {
        navigate('/registration');
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <a href="/main"><img src="/img/logo.png" alt="Logo" /></a>
            </div>
            <div className="login-right">
                <h2>Zaloguj się</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="email"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">ZALOGUJ</button>
                    <button type="button" onClick={handleRegister}>ZAREJESTRUJ</button>
                    <div className="messages">
                        {messages.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
