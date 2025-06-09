import "./LoginPage.css";
import Logo from "../../assets/ByteMe_Logo.png";
import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);
    try {
      const res = await fetch(`${API_URL}/login/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send reset email");
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginDiv">
      <img className="logo" src={Logo} />
      <form onSubmit={handleSubmit}>
        <div className="inputDiv">
          <label className="inputLabel" htmlFor="email">
            Enter your email to reset your password
          </label>
          <input
            className="textInput"
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="submitButton" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {sent && <div style={{ color: "green", marginTop: "1em" }}>Check your email for a reset link!</div>}
        {error && <div style={{ color: "red", marginTop: "1em" }}>{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;