import React, {useState} from 'react';
import logo from '../../assets/ByteMe_Logo.png'
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <ul className={menuOpen ? 'open' : ''}>
        {/* This creates the links to the different pages */}
        <li>
          <NavLink to ="/dashboard"> Dashboard</NavLink>
          </li>
        <li>
          <NavLink to ="/leaderboard"> Leaderboard</NavLink>
          </li>
        <li><NavLink to ="/howtoplay"> How To Play</NavLink>
        </li>
        <li><NavLink to ="/userprofile"> UserName</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar