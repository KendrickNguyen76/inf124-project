import React from "react";
import "./Home.css";
import Bash from "../../assets/bash.png";
import hsaB from "../../assets/hsaB.png";

const LandingText = () => (
  <div className="landing_text">
    <h1>Challenge. Code. Win.</h1>
    <h2>ByteMe - The place to deal with all your coding beef.</h2>
  </div>
);

const LandingImage = ({ bashSrc, hsaBSrc }) => (
  <div className="landing_image">
    <img
      id="landing_bash"
      src={bashSrc}
      alt="Image of Bash - A green computer chip"
    />
    <img
      id="landing_hsaB"
      src={hsaBSrc}
      alt="Image of hsaB - A blue computer chip"
    />
  </div>
);

const AboutSection = () => (
  <div className="about_section">
    <h1>About Us</h1>
    <h2>
      We want you to start loving <u>technical interview questions</u>
    </h2>
    <p>
      At ByteMe, we believe technical interview questions don't have to be
      intimidating — they can actually be exciting. Most people struggle because
      practicing alone feels overwhelming and repetitive.
    </p>
    <p>
      That's why we built a competitive 1v1 platform: to turn practice into a
      thrilling head-to-head challenge. Whether you're racing against friends,
      climbing the leaderboard, or just sharpening your skills, ByteMe
      transforms coding prep into something you'll actually look forward to.
    </p>
  </div>
);

const Home = () => {
  return (
    <div className="home">
      <div className="landing_container">
        <LandingText />
        <LandingImage bashSrc={Bash} hsaBSrc={hsaB} />
      </div>
      <AboutSection />
    </div>
  );
};

export default Home;
