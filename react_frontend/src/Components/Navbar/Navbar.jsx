import React, {useState} from 'react';
import logo from '../../assets/ByteMe_Logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';

import './Navbar.css'


const Navbar = ({loggedIn, setLoggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    localStorage.removeItem("supabase_token");
    console.log("token removed from session")
    navigate('/'); // Redirect to homepage
  };

  return (
    <nav>
      {/* This makes our logo clickable and take us to the homepage */}
      <Link to ="/"> 
        <img src={logo} className='title'/>
      </Link>

      <div 
        /* This creates a drop down menu when screen is small (responsive)*/
        className='menu' 
        onClick={() => 
        {setMenuOpen(!menuOpen)}}
      >
        {/* This creates the three lines that represent the menu */}
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* This creates the links to the different pages */}
      <ul className={menuOpen ? 'open' : ''}> {loggedIn ? (
        <>
          {/*  Pages available when logged in */}
          <li><NavLink to ="/dashboard"> Dashboard</NavLink></li>
          <li><NavLink to ="/leaderboard"> Leaderboard</NavLink></li>
          <li><NavLink to ="/howtoplay"> How To Play</NavLink></li>
          <li><NavLink to ="/userprofile"> User Profile</NavLink></li>
          <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
          </>
        ) : (
          <>
          {/*  Pages available when not logged in */}
          <li><NavLink to ="/howtoplay"> How To Play</NavLink></li>
          <li><NavLink to ="/login"> Log In</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar