import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authAction } from '../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
      const userData = response.data;

      if (userData.username === username) {
        dispatch(authAction.loginSuccess(userData));
        alert('Login successful!');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <div style={{ border: '1px solid black', borderRadius: 50, padding: 50 }}>
        <h2>Welcome</h2>
        <div>
          <input aria-label="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        </div>
        <div>
          <input aria-label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>

    </div>
  );
};

export default Login;
