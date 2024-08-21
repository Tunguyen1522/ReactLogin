import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = 'someUserId'; 
                const response = await axios.get(`/api/Cart/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCartItems(response.data);
            } catch (err) {
                console.error('Error fetching cart items:', err);
                setError('Failed to fetch cart items.');
            }
        };
        fetchCartItems();
    }, []);

    const handleCheckout = () => {
        navigate('/order');
    };

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/')} style={styles.button}>Back to Home</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul style={styles.cartList}>
                    {cartItems.map(item => (
                        <li key={item.id} style={styles.cartItem}>
                            <img src={item.cat.imageUrl} alt={item.cat.name} style={styles.catImage} />
                            <div style={styles.cartInfo}>
                                <h2>{item.cat.name}</h2>
                                <p><strong>Breed:</strong> {item.cat.breed}</p>
                                <p><strong>Price:</strong> {formatPrice(item.cat.price)}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout} style={styles.button}>Checkout</button>
        </div>
    );
};

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
    cartList: {
        listStyleType: 'none',
        padding: 0,
    },
    cartItem: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cartInfo: {
        marginLeft: '10px',
        textAlign: 'left',
    },
    catImage: {
        width: '100px',
        height: 'auto',
        borderRadius: '5px',
    },
};

export default Cart;
