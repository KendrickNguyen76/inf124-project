import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

// Colored Bashes
import GreenBash from '../../assets/Bash.png'
import BlueBash from '../../assets/bash_blue.png'
import RedBash from '../../assets/bash_red.png'
import OrangeBash from '../../assets/bash_orange.png'
import PurpleBash from '../../assets/bash_purple.png'
import PinkBash from '../../assets/bash_pink.png'

// Different Icons
import linkedinIcon from"../../assets/icon_assets/linkedin.png"; 
import twitterIcon from"../../assets/icon_assets/twitter.png";
import gitlabIcon from "../../assets/icon_assets/gitlabLogo.png";
import chatIcon from "../../assets/icon_assets/chat.png";
import lvl1 from "../../assets/Level1.png";

// Constants
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
function Avatar({ userPfp }) {
  const bashImages = [GreenBash, BlueBash, RedBash, OrangeBash, PurpleBash, PinkBash];
  const colorOptions = ["GREEN", "BLUE", "RED", "ORANGE", "PURPLE", "PINK"];
    
  return (
    <div className="avatar-section">
      <img src={ bashImages[colorOptions.indexOf(userPfp)] } className="avatar" />
    </div>
  );
}

// This will be for the social media icons, Left Column, Middle
function SocialMediaIcons ({ links }) {
  const linkStarters = {github: "https://github.com/", twitter: "https://twitter.com/", linkedin: "https://linkedin.com/in/" };
  const [hasGitHub, setHasGitHub] = useState(false);
  const [hasLinkedIn, setHasLinkedIn] = useState(false);
  const [hasTwitter, setHasTwitter] = useState(false);

  return (
   <div>
     <div className="media-title">Social Medias</div>
      <div className="social-icons">
        <img src={linkedinIcon} alt="LinkedIn" />
        <img src={twitterIcon} alt="X" />
        <img src={gitlabIcon} alt="GitLab" />
      </div>
    </div>
  );
}

// This will be for the rank section, Left Column, Bottom
const UserRank = ({ userRank }) => (
  <div>
    <div className="media-title"> Rank</div>
    <div className="rank-icon">
      <img src={lvl1} alt="trophy" />
      <p> {userRank} </p>
    </div>
  </div>
);

// Left Column 
// This will be for the main content, Right Column , Top

const BioSection = ({ userBio }) => {
  const navigate = useNavigate();

  const modifyPage = () => {
    navigate('/usersettings');
  };

  return (
    <div className="bio-section">
      <h2>Bio</h2>
      <p>
        {userBio}
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
        <div className="table_container">  
        <table>
          <thead>
            <tr>
              <th>Played Against</th>
              <th>Winner</th>
              <th>Winner's Time</th>
              <th>Loser's Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                <td><span>Player {i + 1}</span></td>
                <td><span>name{i + 1}</span></td>
                <td><span>{Math.floor(Math.random() * 10)} : {Math.floor(Math.random() * 10)}</span></td>
                <td><span>{Math.floor(Math.random() * 10)} : {Math.floor(Math.random() * 10)}</span></td>
                <td><span>{Math.floor(Math.random() * 10)} : {Math.floor(Math.random() * 10)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  </div>
);

function UserProfileChild( { userProfile } ) {
  return (
    <>
    <UserTitle username={userProfile.get("username")}/>
    <div className="content-row">
      <div className="left-column">
        <Avatar userPfp={userProfile.get("profile_pic")}/>
        <div className="side-by-side">
          <SocialMediaIcons links={userProfile.get("links")}/>
          <UserRank userRank={userProfile.get("rank")}/>
        </div>
      </div>
      <div className="right-column">
        <BioSection userBio={userProfile.get("bio")}/>
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
    setTimeout(() => {setIsLoading(false)}, 1000)
  }, []);

  return (
    <div className = "profile-box">
      { isLoading ? <h1> Loading... </h1> : <UserProfileChild userProfile={userProfile.current}/> }
    </div>
  );
};

export default UserProfile;
