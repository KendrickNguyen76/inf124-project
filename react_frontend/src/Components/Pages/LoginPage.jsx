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
    <div className="loginDiv">
      <img className="logo" src={Logo}/>

      <div className="inputDiv">
        <form action="" method="post">
          <label className="inputLabel" htmlFor="username">Username/Email</label>
          <input className="textInput" type="text" id="username" name="username" placeholder="Enter Username" />

          <label className="inputLabel" htmlFor="password">Password</label>
          <input className="textInput" type="password" id="password" name="password" placeholder="Enter Password" />
        </form>

        <a className="forgetPassLink" href="https://www.alz.org/alzheimers-dementia/what-is-dementia">Forget Password?</a>
      </div>

      <button className="submitButton" onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;
