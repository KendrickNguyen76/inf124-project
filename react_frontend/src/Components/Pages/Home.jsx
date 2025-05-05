import React from "react";
import "./Home.css";
import Bash from "../../assets/bash.png";
import hsaB from "../../assets/hsaB.png";
import laptop from "../../assets/laptop_landing.png";

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
      We want you to start <em>loving <u>techincal interview questions</u> </em>
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

const FeaturesSection = () => (
  <div className="features_section">
    <div className="features_image">
      <img
        id="laptop_landing"
        src={laptop}
        alt="Image of a laptop with bashes on podium"
      />
    </div>
    <div className="features_text">
      <h1>Features</h1>
      <h2>Connect. Compete. Rise Above</h2>
      <p>
        Offering a social platform and ranking system, ByteMe gives you all the
        thrill of competitive gaming — just with a bit more nerd power.
      </p>
    </div>
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
      <FeaturesSection />
    </div>
  );
};

export default Home;
