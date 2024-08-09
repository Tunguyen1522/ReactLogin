import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
    const [UserName, setUserName] = useState('');
    const [passwordHash, setpasswordHash] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login:', { UserName, passwordHash });
        // Here you can add your API call logic
    };

    return (
        <Container>
            <Form onSubmit={handleLogin}>
                <Title>Login</Title>
                <FormGroup>
                    <label htmlFor="username">UserName:</label>
                    <Input
                        id="username"
                        type="text"
                        value={UserName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">Password:</label>
                    <Input
                        id="password"
                        type="password"
                        value={passwordHash}
                        onChange={(e) => setpasswordHash(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    );
};

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 0 15px;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem; 
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Login;
