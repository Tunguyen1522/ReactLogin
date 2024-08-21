import React from 'react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Order Confirmation</h1>
            <p>Your order has been placed successfully!</p>
            <button onClick={handleBackToHome} style={styles.button}>Back to Home</button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
    },
    heading: {  
        marginBottom: '20px',
        fontSize: '2rem',
        color: '#333',
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
};

export default Order;
