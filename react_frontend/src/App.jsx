// import { useState } from 'react'
// import './App.css'
// import {Route, Routes } from 'react-router-dom';

// import Navbar from './Components/Navbar/Navbar'
// import {Home, Dashboard, LeaderBoard, HowToPlay, UserProfile, LoginPage} from './Components/Pages'

// const App = () => {

//   return (
//     <div className="App"> 
//       <Navbar />
//       <Routes>
//         {/* If you lok at our Navbar.jsx file, it should reflect what is here */}
//         <Route path="/" element={<Home />}/>
//         <Route path="/dashboard" element={<Dashboard />}/>
//         <Route path="/leaderboard" element={<LeaderBoard />}/>
//         <Route path="/howtoplay" element={<HowToPlay />}/>
//         {/* change the path name to be soemthing different */}
//         <Route path="/userprofile" element={<UserProfile />}/>
//         <Route path="/login" element={<LoginPage />}/>
//       </Routes>
//     </div>
//   );
// }
// export default App

import { useState } from 'react'
import './App.css'
import {Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import {Home, Dashboard, LeaderBoard, HowToPlay, UserProfile, LoginPage} from './Components/Pages'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App"> 
      <Navbar loggedIn = {loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        {/* If you lok at our Navbar.jsx file, it should reflect what is here */}
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/leaderboard" element={<LeaderBoard />}/>
        <Route path="/howtoplay" element={<HowToPlay />}/>
        {/* change the path name to be soemthing different */}
        <Route path="/userprofile" element={<UserProfile />}/>
        <Route path="/login" element={<LoginPage setLoggedIn = {setLoggedIn} />}/>
      </Routes>
    </div>
    
  );
}
export default App
