import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to the Home Page</h1>
            <div style={styles.buttonContainer}>
                <Link to="/profile" style={styles.link}>Go to your Profile</Link>
                <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f0f0f0',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    heading: {
        fontSize: '2em',
        color: '#333',
    },
    text: {
        fontSize: '1.2em',
        color: '#666',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    link: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginRight: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#dc3545', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default HomePage;
