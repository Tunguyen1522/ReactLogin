import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CatDetail = () => {
    const { id } = useParams();
    const [cat, setCat] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCatDetail = async () => {
            try {
                const response = await axios.get(`/api/Cats/${id}`);
                setCat(response.data);
            } catch (err) {
                console.error('Error fetching cat details:', err);
                setError('Failed to fetch cat details.');
            }
        };
        fetchCatDetail();
    }, [id]);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <button onClick={handleBackToHome} style={styles.button}>Back to Home</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {cat ? (
                <div style={styles.catDetail}>
                    <img src={cat.imageUrl} alt={cat.name} style={styles.catImage} />
                    <div style={styles.catInfo}>
                        <h1>{cat.name}</h1>
                        <p><strong>Breed:</strong> {cat.breed}</p>
                        <p><strong>Age:</strong> {cat.age} years</p>
                        <p><strong>Price:</strong> {formatPrice(cat.price)}</p>
                        <p>{cat.description}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

// Function to format price
const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
    },
    button: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    catDetail: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    catImage: {
        width: '300px',
        height: 'auto',
        borderRadius: '5px',
    },
    catInfo: {
        marginTop: '20px',
        textAlign: 'left',
    },
};

export default CatDetail;
