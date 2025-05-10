import React from "react";
import "./UserProfile.css";
// import avatar from "../../assets/gitlab.png"; // Replace with actual path
import linkedinIcon from "../../assets/linkedin.png";
import twitterIcon from "../../assets/twitter.png";
import chatIcon from "../../assets/chat.png";
import lvl1 from "../../assets/Level1.png";
import icon from "../../assets/gitlabLogo.png";


// This will be for the title, user's name, Top Row in the middle
const UserTitle = () => (
  <div className="page-title">
  <div className="name_line"></div>
    <h1> Byte’s Page</h1>
  <div className="name_line"></div>

</div>
);

// Left Column 
// This will be for the profile picture, Left Column , Top
const Avatar = () => (
  <div className="avatar-section">
    <img src={icon} className="avatar" /> {/* Replace with actual avatar image */}
  </div>
);

// This will be for the social media icons, Left Column, Middle
const SocialMediaIcons = () => (
  <div>
    <div className="media-title">Social Medias</div>
    <div className="social-icons">
      <img src={linkedinIcon} alt="LinkedIn" />
      <img src={twitterIcon} alt="X" />
      <img src={chatIcon} alt="Chat" />
    </div>
  </div>
);

// This will be for the rank section, Left Column, Bottom
const UserRank = () => (
  <div>
    <div className="media-title"> Rank</div>
    <div className="rank-icon">
      <img src={lvl1} alt="trophy" />
    </div>
  </div>
);

// Left Column 
// This will be for the main content, Right Column , Top
const BioSection = () => (
  <div className="bio-section">
    <h2>Bio</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat...
    </p>
    <div className="bio-buttons">
      <button className="edit-button">Edit Profile</button>
    </div>
  </div>
);

const MatchHistory = () => (
  <div className = "History-section">
      <div className="match-title"> Match History</div>   
      <div className="history-section">
        <div className="history-item">
          <ul>
            <li>Played Against</li>
            <li>Winner</li>
            <li>Winner's Time</li>
            <li>Date</li>
          </ul>
        </div>
        <div className="history_scroll">
        {/*placeholders for back end data integration later*/}
        {[...Array(10)].map((_, i) => (
        <div key={i} className="data_row">
          <span className="data_column">Player {i + 1}</span>
          <span className="data_column">#{i + 1}</span>
          <span className="data_column">{Math.floor(Math.random() * 10)}</span>
          <span className="data_column">{Math.floor(Math.random() * 10)}</span>
        </div>
        ))}
        </div>
      </div>
    </div>
);



const UserProfile = () => {
  return (
    
  <div className = "profile-box"> 
  <UserTitle/>
  <div className="content-row">
    <div className="left-column">
      <Avatar />
      <SocialMediaIcons />
      <UserRank />
      </div>
    <div className="right-column">
      <BioSection />
      <MatchHistory />
      </div>
    </div>
  </div>
  );
};

export default UserProfile;
