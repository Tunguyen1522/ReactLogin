import React, { useState } from "react";
import axios from 'axios'; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate fields
        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await axios.post('/api/Users/Registration', {
                UserName: username,
                Email: email,
                PasswordHash: password
            });
            setSuccess("Registration successful!");
            setUsername('');  
            setEmail('');  
            setPassword('');  
            setConfirmPassword('');  
            setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 seconds
        } catch (err) {
            setError(err.response?.data || 'An error occurred during registration.'); 
        }
    };

    return (
        <div style={styles.addUser}>
            <h3 style={styles.heading}>Register</h3>
            <form style={styles.addUserForm} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="off"
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Confirm your Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Register</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </form>
            <div style={styles.login}>
                <p>Already have an Account? </p>
                <Link to="/" style={styles.link}>
                    Login
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0', 
    },
    formContainer: {
        backgroundColor: 'white',
        width: '400px',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    footer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    link: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        padding: '10px 0px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'darkcyan',
        textTransform: 'uppercase',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    }
};

export default Register;
