import './CreateAccount.css'
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

function CreateAccount () {
  return (
    <div className="createAccountDiv">
      <CreateAccountInputBoxes />
      <button className="submitButton" id="createAccount">Create Account</button>
    </div>
  );
}

export default CreateAccount;
