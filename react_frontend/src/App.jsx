import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Navbar/Footer'
import './App.css'
const App = () => {
  return (
    <div className="page-wrapper">
      <div className="container">
        <Navbar />
      </div>

      <div className="bottom-container">
        <Footer />
      </div>
    </div>
  );
};

export default App