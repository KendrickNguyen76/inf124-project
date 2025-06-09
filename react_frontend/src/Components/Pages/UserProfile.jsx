import React from "react";
import { useState, useEffect, useRef } from 'react';
import "./UserProfile.css";

import linkedinIcon from"../../assets/icon_assets/linkedin.png"; 
import twitterIcon from"../../assets/icon_assets/twitter.png";
import icon from "../../assets/icon_assets/gitlabLogo.png";
import chatIcon from "../../assets/icon_assets/chat.png";
import lvl1 from "../../assets/Level1.png";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";


// This will be for the title, user's name, Top Row in the middle
const UserTitle = ( {username} ) => (
  <div className="page-title">
  <div className="name_line"></div>
    <h1> {`${username}'s Page`} </h1>
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

const BioSection = () => {
  const navigate = useNavigate();

  const modifyPage = () => {
    navigate('/usersettings');
  };

  return (
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
      <button className="edit-button" id = "settings button" onClick={modifyPage}>Edit Profile </button>


    </div>
  </div>
  );
};

const MatchHistory = () => (
  
  <div className = "History-section">
      <div className="match-title"> Match History</div>   
      <div className="history-section">
        <div className="history-item">
          <ul>
            <li>Played Against</li>
            <li>Winner</li>
            <li>Winner's Time</li>
            <li>Loser's Time</li>
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
          <span className="data_column">{Math.floor(Math.random() * 10)}</span>
        </div>
        ))}
        </div>
      </div>
    </div>
);

function UserProfileChild( { userProfile } ) {
  return (
    <>
    <UserTitle username={userProfile.get("username")}/>
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
    </>
  );
}


const UserProfile = () => {
  const userToken = localStorage.getItem('supabase_token');
  const [isLoading, setIsLoading] = useState(true); 
  const userProfile = useRef(new Map());
  
  console.log(isLoading);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/userprofile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: userToken }),
        });

        const profile_data = await res.json(); 

        if (!res.ok) throw new Error(profile_data.error || "Failed to get Profile Info");

        return profile_data;
      } catch (error) {
        console.error(error.message);
      }
    }

    const mapUserProfile = async () => {
      const profile_info = await fetchProfile();
      const map = new Map(Object.entries(profile_info[0]));
      userProfile.current = map;
    }

    mapUserProfile();
    console.log("Setting false here!")
    setTimeout(() => {setIsLoading(false)}, 1000)
  }, []);

  return (
    <div className = "profile-box">
      { isLoading ? <h1> Loading... </h1> : <UserProfileChild userProfile={userProfile.current}/> }
    </div>
  );
};

export default UserProfile;
