import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const mockCats = [
        {
            id: 1,
            name: 'Bi',
            breed: 'Siberian',
            age: 2,
            price: 5000000,
            description: 'Một chú mèo xinh đẹp',
            imageUrl: 'Siberian.png'
        },
        {
            id: 2,
            name: 'Bé Bự',
            breed: 'Mèo Anh lông ngắn',
            age: 3,
            price: 8000000,
            description: 'Có một thân hình mũm mĩm, lông ngắn và dày ',
            imageUrl: 'MeoAnhLongNgan.png'
        },
        {
            id: 3,
            name: 'Lù',
            breed: 'Mèo Ba Tư',
            age: 5,
            price: 3000000,
            description: 'Một chú mèo nghe lời và điềm tĩnh',
            imageUrl: 'MeoBaTu.png'
        },

        {
            id: 4,
            name: 'Shadow',
            breed: 'Siamese',
            age: 3,
            price: 4000000,
            description: 'Có đôi mắt xanh cực đẹp cùng với mặt nạ đen',
            imageUrl: 'Siamese.png'
        },

    ];

    useEffect(() => {
        const fetchCats = () => {
            try {
                setCats(mockCats);
                setFilteredCats(mockCats);
            } catch (err) {
                console.error('Error fetching cats:', err);
                setError('Failed to fetch cats.');
            }
        };
        fetchCats();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            setFilteredCats(cats.filter(cat =>
                cat.name.toLowerCase().includes(term.toLowerCase()) ||
                cat.breed.toLowerCase().includes(term.toLowerCase())

            ));
        } else {
            setFilteredCats(cats);
        }
    };

    const addToCart = async (catId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = 'someUserId';
            await axios.post('/api/Cart/add', {
                catId,
                quantity: 1,
                userId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Cat added to cart!');
        } catch (err) {
            console.error('Error adding cat to cart:', err);
            alert('Failed to add cat to cart.');
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <div style={styles.container}>
            <button onClick={handleLogout} style={styles.buttonLogout}>Log Out</button>
            <h1 style={styles.heading}>Welcome to Cat Shop</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchTerm}
                onChange={handleSearch}
                style={styles.searchInput}
            />
            <div style={styles.catList}>
                {filteredCats.length === 0 ? (
                    <p>No cats available.</p>
                ) : (
                    filteredCats.map(cat => (
                        <div key={cat.id} style={styles.catCard}>
                            <img src={cat.imageUrl} alt={cat.name} style={styles.catImage} />
                            <div style={styles.catInfo}>
                                <h2>{cat.name}</h2>
                                <p><strong>Breed:</strong> {cat.breed}</p>
                                <p><strong>Price:</strong> {formatPrice(cat.price)}</p>
                                <p>{cat.description}</p>
                                <button
                                    onClick={() => addToCart(cat.id)}
                                    style={styles.button}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => navigate(`/cat/${cat.id}`)}
                                    style={styles.button}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        position: 'relative',
    },
    buttonLogout: {
        position: 'absolute',
        top: '10px',
        right: '10px',


    },
    heading: {
        marginBottom: '20px',
        fontSize: '2rem',
        color: '#333',
    },
    searchInput: {
        marginBottom: '20px',
        padding: '10px',
        width: '100%',
        maxWidth: '600px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    catList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
    },
    catCard: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        width: '250px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'left',
    },
    catImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '5px',
    },
    catInfo: {
        marginTop: '10px',
    },
    button: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        display: 'block',
        textAlign: 'center',
    },
};

export default HomePage;
