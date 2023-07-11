import React, { useState } from 'react';
import { loginUser } from '../ajax-requests';
import { Link } from 'react-router-dom';


function Login({ setToken,navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password }; //build user object

    const results = await loginUser(user);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>
      <label htmlFor="username"></label>
      <input
        type="text"
        id="username"
        placeholder="Enter Username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <label htmlFor="password"></label>
      <input
        type="password"
        id="password"
        placeholder="Enter Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Enter</button>
      
    </form>
  );
}

export default Login;