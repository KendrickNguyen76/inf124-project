import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
  <div className= 'footer'>
    <ul className="footer-menu">
        <li> <NavLink to = "/aboutus" className = "footer-enter">About Us</NavLink></li>
      </ul>
    </div>
  )
}

export default Footer