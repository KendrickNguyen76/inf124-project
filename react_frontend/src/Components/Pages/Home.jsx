import React from "react";
import "./Home.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import bash_image from "../../assets/modified_homepage_image.png";
import laptop from "../../assets/laptop_landing.png";

// Title and bried blurb for the home page
const LandingText = () => (
  <div className="landing_text">
    <h1>Challenge. Code. Win.</h1>
    <h2>Byte Me - The place to deal with all your coding beef.</h2>
  </div>
);

// Images, below the blurb, on the home page
const LandingImage = ({ bash_image }) => (
  <div className="landing_image">
    <img
      id="landing_bash"
      src={bash_image}
      alt="Image of two Bashes fighting - A green computer chip vs. a blue computer chip"
    />
  </div>
);

const AboutSection = () => (
  <div className="about_section">
    <h1>About Us</h1>
    <h2>
      We want you to start{" "}
      <em>
        loving <u>techincal interview questions</u>{" "}
      </em>
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
      <img id="laptop_landing"
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

const HowItWorksSection = () => (
  <div className="how_it_works_section">
    <h1>How It Works</h1>
    <h2>Create your profile, click play, show off your coding skills.</h2>
    <p>
      Your profile is your badge. Create it, connect with other coders, and
      enter the arena. ByteMe uses real technical interview questions and a
      coding editor that feels just like LeetCode — but now, you're racing
      someone else to solve it first. Win matches, earn rankings, and build your
      reputation. The more you play, the sharper (and more unstoppable) you
      become.
    </p>
  </div>
);

const PlayNowSection = () => {
  const navigate = useNavigate();
  return (
    <div className="play_now_section">
      <h1>Why aren't you coding yet?</h1>
      <div className="play_now_button">
        <button onClick={() => navigate("/login")}>
          Play Now.
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <div className="landing_container">
        <LandingText />
        <LandingImage bash_image={bash_image}/>
      </div>
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PlayNowSection />
    </div>
  );
};

export default Home;
