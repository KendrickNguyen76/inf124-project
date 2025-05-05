import React from "react";
import './Home.css';
import Bash from "../../assets/bash.png";
import hsaB from "../../assets/hsaB.png";

const Home = () => {
  return (
  <div className ='home'>
    <div className='landing_container'>
      <div className='landing_text'>
        <h1>Challenge. Code. Win.</h1>
        <h2>ByteMe - The place to deal with all your coding beef.</h2>
      </div>
      <div className='landing_image'>
        <img id='landing_bash' src={Bash} alt="Image of Bash - A green computer chip" />
        <img id ='landing_hsaB' src={hsaB} alt="Image of hsaB - A blue computer chip" />
      </div>
    </div>

    
  </div>
  );
};

export default Home;