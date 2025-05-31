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

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

function CreateAccountInputBoxes({ form, onChange }) {
  return (
    <div className="inputDiv">
      {/* Remove the form tag to avoid nested forms */}
      <label className="inputLabel" htmlFor="name">Name</label>
      <input className="textInput createAccountTextInput" type="text" id="name" name="name" placeholder="Name" value={form.name} onChange={onChange} />

      <label className="inputLabel" htmlFor="username">Username</label>
      <input className="textInput createAccountTextInput" type="text" id="username" name="username" placeholder="Username" value={form.username} onChange={onChange} />

      <label className="inputLabel" htmlFor="email">Email</label>
      <input className="textInput createAccountTextInput" type="text" id="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />

      <label className="inputLabel" htmlFor="password">Password</label>
      <input className="textInput createAccountTextInput" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />

      <label className="inputLabel" htmlFor="confirm_password">Confirm Password</label>
      <input className="textInput createAccountTextInput" type="password" name="confirm_password" placeholder="Confirm Password" value={form.confirm_password} onChange={onChange} />
    </div>
  );
};

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
};

function CreateAccount ({setLoggedIn}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Account creation failed");
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="createAccountDiv">
      <h3 className="bashCustomizeHeader">Customize Your Bash!</h3>
      <BashSelection />
      <form onSubmit={handleCreateAccount}>
        <CreateAccountInputBoxes form={form} onChange={handleChange} />
        <button className="submitButton" id="createAccount" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
export default CreateAccount;