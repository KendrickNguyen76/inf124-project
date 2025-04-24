import React from 'react';
import './Navbar.css'
import logo from '../../assets/ByteMe_Logo.png'

const Navbar = () => {
  return (
  <div className= 'navigation'>
    <img src={logo} className='nav-logo'/>
    {/* <div className="nav-logo"> Byte Me </div> */}
    <ul className="nav-menu">
        <li> Home </li>
        <li> About</li>
        <li className='nav-enter'> Log In </li>
      </ul>
    </div>
  )
}

export default Navbar