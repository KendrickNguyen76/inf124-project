import './CreateAccount.css'
import Bash from '../../assets/Bash.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

/*
function BashSelection () {
  return (
    <div className="bashSelectionDiv">
      <img className="selectedBash" src={Bash}/>

      <form action="">
        <input type="radio" className="colorSelectionRadio" id="green" name="colorSelection" value="Green" checked={true}/>
        <input type="radio" className="colorSelectionRadio" id="blue" name="colorSelection" value="Blue" />
        <input type="radio" className="colorSelectionRadio" id="red" name="colorSelection" value="Red" />
        <input type="radio" className="colorSelectionRadio" id="orange" name="colorSelection" value="Orange" />
        <input type="radio" className="colorSelectionRadio" id="purple" name="colorSelection" value="Purple" />
        <input type="radio" className="colorSelectionRadio" id="pink" name="colorSelection" value="Pink" />
      </form>
    </div>
  );
}
*/

/* I ChatGPTed this and fixed it up, hopefully this works..*/
function BashSelection() {
  const [selectedColor, setSelectedColor] = useState('Green');

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  return (
    <div className="bashSelectionDiv">
      <img className="selectedBash" src={Bash} alt="Bash" />

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

function CreateAccount () {
  return (
    <div className="createAccountDiv">
      <h3 className="bashCustomizeHeader">Customize Your Bash!</h3>
      <BashSelection />
      <CreateAccountInputBoxes />
      <button className="submitButton" id="createAccount">Create Account</button>
    </div>
  );
}

export default CreateAccount;
