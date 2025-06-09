import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
  <footer className= 'footer'>
    <ul className="footer-menu">
        <li> <NavLink to = "/aboutus" className = "footer-enter">About Us</NavLink></li>
      </ul>
    </footer>
  )
}

export default Footer