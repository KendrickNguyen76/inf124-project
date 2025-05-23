import { useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
  UserSettings
} from "./Components/Pages";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const hideNavAndFooter = ["/gamepage"].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavAndFooter && (
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
      <Routes>
        {/* If you lok at our Navbar.jsx file, it should reflect what is here, this will also hide the nav bar for specific pages */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/howtoplay" element={<HowToPlay />} />

        {/* change the path name to be soemthing different */}
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/usersettings" element={<UserSettings/>} />

        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/createaccount" element={<CreateAccount setLoggedIn={setLoggedIn}/>} />
        <Route path="/gamepage" element={<GamePage />} />
      </Routes>
      {/* have footer at bottom of each page w link to about us, this will hide the footer for speciifc pages*/}
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};
export default App;
