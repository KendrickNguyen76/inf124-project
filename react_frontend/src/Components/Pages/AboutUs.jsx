import React from "react";
import "./AboutUs.css";
{/* have seperate sections for title, concept, and team description */}

{/* Title about us concept*/}
const AboutTitle = () => (
  <div className = "about_title">
    <h1> About Us </h1>
  </div>
)

{/* have the paragraph of about us here*/}
const AboutParagraph = () => (
  <div className="about_paragraph">
    <p>
      At ByteMe, we believe technical interview questions don't have to be
      intimidating — they can actually be exciting. Most people struggle because
      practicing alone feels overwhelming and repetitive.
    </p>
  </div>
);

const AboutTeam = () => (
  <div className = "about_team">
    <h1> Our Team </h1>
  </div>
)

const Member1 = () => (
  <div className = "member_1">
    <h1> Baly Aileen Martinez</h1>
  </div>
)

const Member2 = () => (
  <div className = "member_2">
    <h1> David Sajonas Joves</h1>
  </div>
)

const Member3 = () => (
  <div className = "member_3">
    <h1> Kendrick Do Nguyen</h1>
  </div>
)

const Member4 = () => (
  <div className = "member_4">
    <h1>Sonia Kaur Heyer</h1>
  </div>
)


{/* description of our concept and mission*/}

const AboutUs = () => {
  return (
    <div className = "about_page">
      <AboutTitle/>
      <AboutParagraph/>
      <AboutTeam/>
      <div className = "profile_container_1">
        <Member1/>
        <Member2/>
      </div>
      <div className = "profile_container_2">
        <Member3/>
        <Member4/>
      </div>
    </div>
  )
};

export default AboutUs;