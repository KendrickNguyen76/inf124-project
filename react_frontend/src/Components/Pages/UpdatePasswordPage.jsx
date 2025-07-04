import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../../assets/ByteMe_Logo.png";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

function getAccessTokenFromHash() {
  const params = new URLSearchParams(window.location.search);
  return params.get("access_token");
}

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(getAccessTokenFromHash());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!accessToken) {
      setError("Missing access token. Please use the link from your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, access_token: accessToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      setSuccess(true);
      localStorage.removeItem("supabase_token");
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
          <label className="inputLabel" htmlFor="password">
            New Password
          </label>
          <input
            className="textInput"
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={success}
          />
          <label className="inputLabel" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            className="textInput"
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            disabled={success}
          />
        </div>
        {success ? (
          <button
            className="submitButton"
            type="button"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        ) : (
          <button className="submitButton" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        )}
        {success && (
          <div style={{ color: "green", marginTop: "1em" }}>
            Password updated! You can now log in.
          </div>
        )}
        {error && <div style={{ color: "red", marginTop: "1em" }}>{error}</div>}
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
