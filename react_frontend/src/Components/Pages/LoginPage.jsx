import "./LoginPage.css";
import Logo from "../../assets/ByteMe_Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

function InputBoxes({ form, onChange }) {
  return (
    <div className="inputDiv">
      <label className="inputLabel" htmlFor="username">
        Email
      </label>
      <input
        className="textInput"
        type="text"
        id="username"
        name="username"
        placeholder="Enter Username"
        value={form.username}
        onChange={onChange}
      />

      <label className="inputLabel" htmlFor="password">
        Password
      </label>
      <input
        className="textInput"
        type="password"
        id="password"
        name="password"
        placeholder="Enter Password"
        value={form.password}
        onChange={onChange}
      />
      <a
        className="forgotPassLink"
        href="https://www.alz.org/alzheimers-dementia/what-is-dementia"
      >
        Forgot Password?
      </a>
    </div>
  );
};

function Divider() {
  return (
    <div className="divider">
      <div className="line"></div>
      <label className="inputLabel_end">No Account?</label>
      <div className="line"></div>
    </div>
  );
}

const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/createaccount");
  };

  return (
    <div className="loginDiv">
      <img className="logo" src={Logo} />
      <form onSubmit={handleLogin}>
        <InputBoxes form={form} onChange={handleChange} />
        <button className="submitButton" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <Divider />
      <button
        className="submitButton"
        id="createAccount"
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
    </div>
  );
};

export default LoginPage;
