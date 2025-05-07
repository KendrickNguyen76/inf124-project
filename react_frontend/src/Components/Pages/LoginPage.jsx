import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/'); // Redirect after login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>Login Page</h2>

      <form action="" method="post">
          <label for="username">Username/Email</label>
          <input type="text" id="username" name="username" placeholder="Enter Username" />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" />
      </form>

      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;
