import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from '../components/Filter';
import './Offers.css';
import Header from '../components/Header';

const Offers = () => {
    const [filters, setFilters] = useState({});
    const [stones, setStones] = useState([]);
    const [error, setError] = useState(null);

    const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (checked) {
                newFilters[name] = value; 
            } else {
                delete newFilters[name];  
            }
            return newFilters;
        });
    };

    const handleFilterUpdate = (filterName, value) => {
        if (value) {
            setFilters(prevFilters => ({
                ...prevFilters,
                [filterName]: value
            }));
        } else {
            setFilters(prevFilters => {
                const { [filterName]: _, ...rest } = prevFilters;
                return rest;
            });
        }
    };

    useEffect(() => {
        const fetchStones = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/stones', {
                    params: filters,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setStones(response.data);
            } catch (err) {
                setError(err);
                console.error('Error loading stones:', err);
            }
        };
        fetchStones();
    }, [filters]);

    return (
        <div>
            <Header />
            <Filter handleFilterChange={handleFilterChange} handleFilterUpdate={handleFilterUpdate} />
            <div className="line-divider"></div>
            {error && <div className="error">Error loading stones: {error.message}</div>}
            <div className="stones-container">
                {stones.map(stone => (
                    <div
                        className="stone" 
                        key={stone.id}
                        style={{ 
                            backgroundImage: `url(${stone.path})`,
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center', 
                            backgroundRepeat: 'no-repeat' 
                        }}
                    >
                        <img src={stone.path} alt={stone.name} onError={() => console.log('Error loading image:', stone.path)} style={{ display: 'none' }}/>
                        <p className="name">{stone.name}</p>
                        <p className="price">{stone.price} PLN</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Offers;
