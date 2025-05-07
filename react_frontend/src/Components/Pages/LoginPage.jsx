import React from 'react';
import './LoginPage.css'
import Logo from "../../assets/ByteMe_Logo.png";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/'); // Redirect after login
  };

  return (
    <div className="login_div">
        <img id="logo" src={Logo}/>

        <div className="input_div">
            <form action="" method="post">
              <label htmlFor="username">Username/Email</label>
              <input className="text_input" type="text" id="username" name="username" placeholder="Enter Username" />

              <label htmlFor="password">Password</label>
              <input className="text_input" type="password" id="password" name="password" placeholder="Enter Password" />
            </form>
        </div>

        <button className="submitButton" onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;
