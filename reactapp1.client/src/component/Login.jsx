import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [UserName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!UserName || !password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post('/api/Users/Login', {
                Username: UserName,
                PasswordHash: password
            });

            localStorage.setItem('token', response.data.token);
            setSuccess("Login successful!");
            setUserName('');  
            setPassword('');  
            navigate('/HomePage');
            setTimeout(() => navigate('/secure'), 1500); // Redirect after 1.5 seconds
        } catch (err) {
            setError(err.response?.data || 'Invalid UserName or password.');

        }
    };

    return (
        <div style={styles.addUser}>
            <h3 style={styles.heading}>Login</h3>
            <form style={styles.addUserForm} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label htmlFor="UserName">UserName:</label>
                    <input
                        type="UserName"
                        id="UserName"
                        name="UserName"
                        autoComplete="off"
                        placeholder="Enter your UserName"
                        value={UserName}
                        onChange={(e) => setUserName(e.target.value)}
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
                    <button type="submit" style={styles.button}>Login</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </form>
            <div style={styles.login}>
                <p>Don't have an Account? </p>
                <Link to="/register" style={styles.link}>
                    Sign Up
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
        minHeight: '100vh', 
        backgroundColor: '#f4f4f4', 
    },
    formContainer: {
        backgroundColor: 'white',
        width: '100%',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    addUserForm: {

        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        flexDirection: 'column',
        
    },


    addUser: {



        justifyContent: 'center',
    },

    login: {
        width: '100%'
    },
    form: {
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
        width: '400px',
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '420px',
    },
    footer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    link: {
        display: 'inline-block',
        width: '420px',
        padding: '10px  0px ',
        textAlign: 'center',
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

export default Login;
