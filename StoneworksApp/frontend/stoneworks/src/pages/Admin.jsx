import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [stones, setStones] = useState([]);
  const [stoneName, setStoneName] = useState('');
  const [stoneType, setStoneType] = useState('');
  const [stoneColor, setStoneColor] = useState('');
  const [stonePrice, setStonePrice] = useState('');
  const [stoneImage, setStoneImage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || user.type !== 'admin') {
      navigate('/login');
    } else {
      fetchStones();
    }
  }, [user, navigate]);

  const fetchStones = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/stones');
      setStones(response.data);
    } catch (error) {
      console.error('Error fetching stones:', error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleAddStone = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/stones', {
        name: stoneName,
        type: stoneType,
        color: stoneColor,
        price: stonePrice,
        path: stoneImage,
      });
      setMessages(['Kamień został dodany pomyślnie']);
      fetchStones();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Wystąpił błąd podczas dodawania kamienia';
      setMessages([`Error adding stone: ${errorMessage}`]);
    }
  };

  const handleDeleteStone = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/stones/${id}`);
      fetchStones();
    } catch (error) {
      console.error('Error deleting stone:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="menu-container">
        <Link to="/admin">
          <img className="logo" src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" />
        </Link>
        <div className="menu-links">
          {user ? (
            <Link to="/login" onClick={handleLogout}>Wyloguj</Link>
          ) : (
            <Link to="/login">Logowanie</Link>
          )}
        </div>
      </div>
      <div className="admin-content">
        <h1>Admin Panel</h1>
        <p>Witaj w panelu administratora.</p>

        <div className="form-container">
          <div className="admin-right">
            <h2>Dodaj kamień</h2>
            <form onSubmit={handleAddStone}>
              <div className="messages">
                {messages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
              <input
                type="text"
                name="stone_name"
                placeholder="Nazwa kamienia"
                value={stoneName}
                onChange={(e) => setStoneName(e.target.value)}
                required
              />
              <select
                name="stone_type"
                value={stoneType}
                onChange={(e) => setStoneType(e.target.value)}
                required
              >
                <option value="" disabled>Wybierz typ kamienia</option>
                <option value="granit">Granit</option>
                <option value="kwarcyt">Kwarcyt</option>
                <option value="piaskowiec">Piaskowiec</option>
                <option value="marmur">Marmur</option>
              </select>
              <select
                name="stone_color"
                value={stoneColor}
                onChange={(e) => setStoneColor(e.target.value)}
                required
              >
                <option value="" disabled>Wybierz kolor kamienia</option>
                <option value="biały">Biały</option>
                <option value="czarny">Czarny</option>
                <option value="kremowy">Kremowy</option>
                <option value="czerwony">Czerwony</option>
              </select>
              <input
                type="number"
                name="stone_price"
                placeholder="Cena kamienia"
                value={stonePrice}
                onChange={(e) => setStonePrice(e.target.value)}
                required
                min="100"
                step="any"
              />
              <input
                type="text"
                name="stone_image"
                placeholder="Link do obrazka kamienia"
                value={stoneImage}
                onChange={(e) => setStoneImage(e.target.value)}
                required
              />
              <button type="submit">Dodaj kamień</button>
            </form>
          </div>
          <div className="admin-right">
            <h2>Usuń kamień</h2>
            <select onChange={(e) => handleDeleteStone(e.target.value)} value="">
              <option value="" disabled>Wybierz kamień do usunięcia</option>
              {stones.map((stone) => (
                <option key={stone.id} value={stone.id}>
                  {stone.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
