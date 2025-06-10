import { useState, useEffect } from "react";
/*import "./App.css";*/
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import {
  Home,
  Dashboard,
  LeaderBoard,
  HowToPlay,
  UserProfile,
  LoginPage,
  AboutUs,
  CreateAccount,
  GamePage,
  UserSettings,
  QuestionBank,
  QuestionBankQuestions,
  ComingSoon,
  ForgotPasswordPage,
  UpdatePasswordPage,
} from "./Components/Pages";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const hideNavAndFooter = ["/gamepage", "/update-password"].includes(
    location.pathname
  );

  /*added theme functionality*/
  useEffect(() => {
    // Check for supabase_token in localStorage to set loggedIn state
    const token = localStorage.getItem("supabase_token");
    setLoggedIn(!!token);

    // Fetch and apply user theme if token exists, otherwise apply default theme
    const initTheme = async () => {
      if (token) {
        const data = await fetchUserTheme(token);
        if (data && typeof data.is_light === "boolean") {
          applyTheme(data.is_light);
          return;
        }
      }
      // If no token or theme fetch fails, apply default (light) theme
      applyTheme(true); // or false for dark mode by default
    };
    initTheme();
  }, []);
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("supabase_token");
      if (!token) {
        setLoggedIn(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/login/validate-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        setLoggedIn(!!data.valid);
        if (!data.valid) {
          localStorage.removeItem("supabase_token");
        }
      } catch (err) {
        setLoggedIn(false);
        localStorage.removeItem("supabase_token");
      }
    };
    checkSession();
  }, [location.pathname]);

  const applyTheme = (isLight) => {
    const existingLink = document.getElementById("theme-stylesheet");
    console.log(` Applying ${isLight ? "Light" : "Dark"} Mode`);
    const themeHref = isLight ? "/App_light.css" : "/App_dark.css";
    console.log(
      `Applying ${isLight ? "Light" : "Dark"} Mode with href:`,
      themeHref
    );
    if (existingLink) {
      existingLink.href = themeHref;
    } else {
      const link = document.createElement("link");
      link.id = "theme-stylesheet";
      link.rel = "stylesheet";
      link.href = themeHref;
      document.head.appendChild(link);
    }
  };

  const fetchUserTheme = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/usertheme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      console.log(" Theme boolean fetched:", data);
      return data;
    } catch (err) {
      console.error(" Failed to fetch user theme:", err);
      return null;
    }
  };

  return (
    <div className="App">
      {!hideNavAndFooter && (
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
      {!hideNavAndFooter && <div style={{ height: "80px" }}></div>}{" "}
      {/* spacer */}
      <main className="main-content">
        <Routes>
          {/* If you lok at our Navbar.jsx file, it should reflect what is here, this will also hide the nav bar for specific pages */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
          <Route path="/questionbank" element={<QuestionBank />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route
            path="/questionbankquestions"
            element={<QuestionBankQuestions />}
          />

          {/* change the path name to be soemthing different */}
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/usersettings" element={<UserSettings />} />

          <Route
            path="/login"
            element={<LoginPage setLoggedIn={setLoggedIn} />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route
            path="/createaccount"
            element={<CreateAccount setLoggedIn={setLoggedIn} />}
          />
          <Route path="/gamepage" element={<GamePage />} />
        </Routes>
      </main>
      {/* have footer at bottom of each page w link to about us, this will hide the footer for speciifc pages*/}
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};
export default App;
