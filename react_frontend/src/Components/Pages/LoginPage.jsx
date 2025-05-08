import './LoginPage.css'
import Logo from "../../assets/ByteMe_Logo.png";
import { useNavigate } from 'react-router-dom';

function InputBoxes() {
  return (
    <div className="inputDiv">
      <form action="" method="post">
        <label className="inputLabel" htmlFor="username">Username/Email</label>
        <input className="textInput" type="text" id="username" name="username" placeholder="Enter Username" />

        <label className="inputLabel" htmlFor="password">Password</label>
        <input className="textInput" type="password" id="password" name="password" placeholder="Enter Password" />
      </form>

      <a className="forgotPassLink" href="https://www.alz.org/alzheimers-dementia/what-is-dementia">Forgot Password?</a>
    </div>
  );
}

function Divider() {
  return (
    <div className="divider">
      <div className="line"></div>
        <label className="inputLabel">No Account?</label>
      <div className="line"></div>
    </div>
  );
}

const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/'); // Redirect after login
  };
  
  const handleCreateAccount = () => {
      navigate('/createaccount');
  };

  // Create Account button still needs code to work

  return (
    <div className="loginDiv">
      <img className="logo" src={Logo}/>
      <InputBoxes />
      <button className="submitButton" onClick={handleLogin}>Log In</button>
      <Divider />
      <button className="submitButton" id="createAccount" onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

export default LoginPage;
