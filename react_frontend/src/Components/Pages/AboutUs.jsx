import React from "react";
import "./AboutUs.css";
import bashpurpleIcon from "../../assets/bash_purple.png";
import bashredIcon from "../../assets/bash_red.png";
import bashblueIcon from "../../assets/bash_blue.png";
import bashgreenIcon from "../../assets/bash_green.png";
{/* have seperate sections for title, concept, and team description */}

{/* Title about us concept*/}
const AboutTitle = () => (
  <div className = "about_title">
    <h1>About Us</h1>
  </div>
)

const OurMission = () => (
  <div className = "our_mission">
    <h1>Our Mission</h1>
    <p>
      At ByteMe, we believe technical interview questions don't have to be
      intimidating — they can actually be exciting. Most people struggle because
      practicing alone feels overwhelming and repetitive.
    </p>
  </div>
)

/* have the paragraph of about us here
const AboutParagraph = () => (
  <div className="about_paragraph">
    <p>
      At ByteMe, we believe technical interview questions don't have to be
      intimidating — they can actually be exciting. Most people struggle because
      practicing alone feels overwhelming and repetitive.
    </p>
  </div>
);*/

/*our individual team member paragraphs*/
const AboutTeam = () => (
  <div className = "about_team">
    <h1>Our Team</h1>
  </div>
)

const Member1 = () => (
  <div className = "member_1">
    <h1>Baly Aileen Martinez</h1>
    <p>
      "I like that boulder. That is a NICE boulder" -Donkey from the animated movie Shrek (2001)
    </p>
  </div>
)

const Member2 = () => (
  <div className = "member_2">
    <h1>David Sajonas Joves</h1>
    <p>
      "I like volleyball"                                                                    
    </p>
  </div>
)

const Member3 = () => (
  <div className = "member_3">
    <h1>Kendrick Do Nguyen</h1>
    <p>
      "I miss my wife, Tails" - Dr. Eggman                                                           
    </p>
  </div>
)

const Member4 = () => (
  <div className = "member_4">
    <h1>Sonia Kaur Heyer</h1>
    <p>
      "Bad Computer! No! No!" - Jake, Adventure Time
    </p>
  </div>
)

const Image1 = () => (
  <div className = "bash1">
    <img src={bashpurpleIcon} alt="bashPurple" />
  </div>
)
const Image2 = () => (
  <div className = "bash2">
    <img src={bashblueIcon} alt="bashBlue" />
  </div>
)
const Image3 = () => (
  <div className = "bash3">
    <img src={bashgreenIcon} alt="bashGreen" />
  </div>
)
const Image4 = () => (
  <div className = "bash4">
    <img src={bashredIcon} alt="bashRed" />
  </div>
)

{/* description of our concept and mission*/}

const AboutUs = () => {
  return (
    <div className = "about_page">
      <AboutTitle/>
      <OurMission/>
      <AboutTeam/>
      <div className = "members">
        <Image1/>
        <Member1/>
        <Image2/>
        <Member2/>
        <Image3/>
        <Member3/>
        <Image4/>
        <Member4/>
      </div>
    </div>
  )
};

export default AboutUs;