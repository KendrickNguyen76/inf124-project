import React from "react";
import "./AboutUs.css";
import bashpurpleIcon from "../../assets/bash_purple.png";
import bashredIcon from "../../assets/bash_red.png";
import bashblueIcon from "../../assets/bash_blue.png";
import bashgreenIcon from "../../assets/bash_green.png";
import aboutBanner from "../../assets/about us banner.png";
{/* have seperate sections for title, concept, and team description */}

{/* Title about us concept*/}
const AboutTitle = () => (
  <div className = "about_title">
    <img src={aboutBanner} alt="Mockup Banner behind About Us Text" />
    <div className="overlay"></div>
    <h1>About Us</h1>
  </div>
)

const OurMission = () => (
  <div className = "our_mission">
    <div className="our_mission_title">
      <h1>Our Mission</h1>
      <div className="name_line_title"></div>
    </div>

    <div className="our_mission_title">
      <p>
      At ByteMe, we believe technical interview questions don't have to be
      intimidating — they can actually be exciting. Most people struggle because
      practicing alone feels overwhelming and repetitive.
      </p>
    </div>
  </div>
)

/* have the paragraph of about us here*/
const AboutParagraph = () => (
  <div className = "about_paragraph">
    
    <div className="about_paragraph_title">
      <h1>Our Story</h1>
      <div className="name_line_title"></div>
    </div>

    <div className="about_paragraph_title">
      <p>
        Inspired by a lack of such a product in industry our team decided
        to create a gamified leet code in order to inspire more coders out
        there to test their skills and have more motivation to improve.
      </p>
    </div>

  </div>
)

/*our individual team member paragraphs*/
const AboutTeam = () => (
  <div className = "about_team">
    <h1>Our Team</h1>
  </div>
)
const TeamMember = ({name, quote, imgSrc, alt}) => (
  <div className = "team_member">
    <div className = "member_img">
      <img src={imgSrc} alt={alt} />
    </div>
    <div className = "member_info">
      <h1>{name}</h1>
      <p>{quote}</p>
    </div>
  </div>
);

{/* description of our concept and mission*/}

const AboutUs = () => {
  return (
      <div className = "about_page">
        <AboutTitle/>
        <OurMission/>
        <AboutParagraph/>
        <AboutTeam/>
      <div className="members">
        <TeamMember
          name="Baly Aileen Martinez"
          quote='"I like that boulder. That is a NICE boulder" -Donkey from Shrek'
          imgSrc={bashpurpleIcon}
          alt="bashPurple"
        />
        <TeamMember
          name="David Sajonas Joves"
          quote='"I like volleyball"'
          imgSrc={bashblueIcon}
          alt="bashBlue"
        />
        <TeamMember
          name="Kendrick Do Nguyen"
          quote='"I miss my wife, Tails" - Dr. Eggman'
          imgSrc={bashgreenIcon}
          alt="bashGreen"
        />
        <TeamMember
          name="Sonia Kaur Heyer"
          quote='"Bad Computer! No! No!" - Jake, Adventure Time'
          imgSrc={bashredIcon}
          alt="bashRed"
        />
        </div>
        </div>
  )
};

export default AboutUs;