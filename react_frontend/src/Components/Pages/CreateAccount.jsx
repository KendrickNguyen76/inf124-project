import './CreateAccount.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Colored Bashes
import GreenBash from '../../assets/Bash.png'
import BlueBash from '../../assets/bash_blue.png'
import RedBash from '../../assets/bash_red.png'
import OrangeBash from '../../assets/bash_orange.png'
import PurpleBash from '../../assets/bash_purple.png'
import PinkBash from '../../assets/bash_pink.png'

function CreateAccountInputBoxes() {
  return (
    <div className="inputDiv">
      <form action="" method="post">
      
        <label className="inputLabel" htmlFor="name">Name</label>
        <input className="textInput createAccountTextInput" type="text" id="name" name="name" placeholder="Name" />

        <label className="inputLabel" htmlFor="username">Username</label>
        <input className="textInput createAccountTextInput" type="text" id="username" name="username" placeholder="Username" />
      
        <label className="inputLabel" htmlFor="email">Email</label>
        <input className="textInput createAccountTextInput" type="text" id="email" name="email" placeholder="Email" />

        <label className="inputLabel" htmlFor="password">Password</label>
        <input className="textInput createAccountTextInput" type="password" name="password" placeholder="Password" />

        <label className="inputLabel" htmlFor="confirm_password">Confirm Password</label>
        <input className="textInput createAccountTextInput" type="password" name="confirm_password" placeholder="Confirm Password" />
      </form>
    </div>
  );
}

/* I ChatGPTed this and fixed it up, hopefully this works..*/
function BashSelection() {
  /* Potentially the jankiest piece of code i've written so far, but it does work so....*/
  const bashImages = [GreenBash, BlueBash, RedBash, OrangeBash, PurpleBash, PinkBash]
  const colorOptions = ["Green", "Blue", "Red", "Orange", "Purple", "Pink"]

  const [selectedColor, setSelectedColor] = useState('Green');
  const [selectedBash, setSelectedBash] = useState(bashImages[0]);

  const handleColorChange = (value) => {
    if (colorOptions.includes(value)) {
      setSelectedColor(value);
      setSelectedBash(bashImages[colorOptions.indexOf(value)]);
    }
  };

  return (
    <div className="bashSelectionDiv">
      <img className="selectedBash" src={selectedBash} alt="Bash" />

      <form>
        {['Green', 'Blue', 'Red', 'Orange', 'Purple', 'Pink'].map((color) => (
            <input
              type="radio"
              className="colorSelectionRadio"
              id={color.toLowerCase()}
              name="colorSelection"
              value={color}
              checked={selectedColor === color}
              onChange={() => handleColorChange(color)}
            />
        ))}
      </form>
    </div>
  );
}

function CreateAccount ({setLoggedIn}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/'); // Redirect after login
  };

  return (
    <div className="createAccountDiv">
      <h3 className="bashCustomizeHeader">Customize Your Bash!</h3>
      <BashSelection />
      <CreateAccountInputBoxes />
      <button className="submitButton" id="createAccount" onClick={ handleLogin }>Create Account</button>
    </div>
  );
}

export default CreateAccount;
