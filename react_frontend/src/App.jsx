import { useState } from 'react'
import './App.css'
import {Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar'
import {Home, Dashboard, LeaderBoard, HowToPlay, UserProfile} from './Components/Pages'

const App = () => {
  return (
    <div className="App"> 
      <Navbar />
      <Routes>
        {/* If you lok at our Navbar.jsx file, it should reflect what is here */}
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/leaderboard" element={<LeaderBoard />}/>
        <Route path="/howtoplay" element={<HowToPlay />}/>
        {/* change the path name to be soemthing different */}
        <Route path="/userprofile" element={<UserProfile />}/>
      </Routes>
    </div>
  );
}
export default App
