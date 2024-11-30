import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      console.log('Sending request to backend...');
      const response = await api.post('/auth/register', { username, password });
      setMessage('User registered successfully!');
      console.log(response.data)
      
      const { userId, token } = response.data;
      dispatch(login({ userId, token })); // Dispatch login action
      navigate('/tasks')
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setMessage('Failed to register user.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default Register;