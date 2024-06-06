import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import UserContext from '../context/UserContext';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [messages, setMessages] = useState([]);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmedPassword) {
            setMessages(['Hasła się nie zgadzają']);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { email, password, name, surname });
            if (response.status === 200) {
                setMessages([response.data]);
                setUser({ email });
                navigate('/main'); // Przekierowanie po rejestracji
            }
        } catch (error) {
            if (error.response) {
                setMessages([`Wystąpił błąd podczas rejestracji: ${error.response.data}`]);
            } else {
                setMessages(['Wystąpił błąd podczas rejestracji']);
            }
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <a href="/main"><img src="/img/logo.png" alt="Logo" /></a>
            </div>
            <div className="register-right">
                <h2>Zarejestruj się</h2>
                <form onSubmit={handleRegister}>
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
                    <input
                        type="password"
                        name="confirmedPassword"
                        placeholder="potwierdź hasło"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="nazwisko"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <button type="submit">ZAREJESTRUJ</button>
                    <button type="button" onClick={handleLogin}>ZALOGUJ</button>
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

export default Registration;
