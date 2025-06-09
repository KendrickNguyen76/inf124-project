import React from "react";
import "./UserSettings.css";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { getUserProfile, updateUserProfile, updateUserAppearance, updateNameSocials } from './modules/userSettingsCrud';

// Colored Bashes
import GreenBash from '../../assets/Bash.png'
import BlueBash from '../../assets/bash_blue.png'
import RedBash from '../../assets/bash_red.png'
import OrangeBash from '../../assets/bash_orange.png'
import PurpleBash from '../../assets/bash_purple.png'
import PinkBash from '../../assets/bash_pink.png'
import SiteViewGreen from '../../assets/SiteOverviewOG.png'
import { FiEdit } from "react-icons/fi";
import { MdStars } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import linkedinIcon from"../../assets/icon_assets/linkedin.png"; 
import twitterIcon from"../../assets/icon_assets/twitter.png";
import giticon from "../../assets/icon_assets/gitlabLogo.png";


// Left Column
const SettingsBar = ({ activeTab, onSelect }) => {
  return (
    <div className="settings-bar">
      <h2>Settings</h2>
      <div 
        className={`selection-box ${activeTab === 'editAccount' ? 'editAccount-active' : ''}`} 
        onClick={() => onSelect("editAccount")}
      >
        <div className="edit-profile-heading">
          <FiEdit />
          <span>Edit Account</span>
        </div>
      </div>
      <div 
        className={`selection-box ${activeTab === 'editProfile' ? 'editProfile-active' : ''}`} 
        onClick={() => onSelect("editProfile")}
      >
        <div className="edit-profile-heading">
          <CgProfile />
          <span>Edit Profile</span>
        </div>
      </div>
      <div 
        className={`selection-box ${activeTab === 'appearance' ? 'appearance-active' : ''}`} 
        onClick={() => onSelect("appearance")}
      >
         <div className="edit-profile-heading">
          <MdStars />
          <span>Appearance</span>
        </div>       
      </div>
      </div>
  );
};

// Component for the right sidebar
function EditButtons({ handleSaveAction }) {
  const navigate = useNavigate();

  const handleSave = () => {
    handleSaveAction();
    navigate("/userprofile");
  }

  const handleCancel = () => {
    navigate("/userprofile");
  }
  
  return (
      <div className="edit-buttons">
        <button className="edit-button" type = "settings button" onClick={handleCancel}>Cancel</button>
        <button className="edit-button" type = "settings button" onClick={handleSave}>Save Changes</button>
      </div>
  );
}

function DeleteButton() {
  return (
      <div className="delete-buttons">
        <button className="edit-button" type = "delete button">Delete Account</button>
      </div>
  );
}

// Right Column

// EditAccount View - Edit UserName & Password
function InputBoxes( { userName, setUserName, socialLinks, setSocialLinks } ) {
  const socialPlatforms = {
    Github: {
      icon: <img className="icon-img" src={giticon} alt="GitHub" />,
      baseUrl: "https://github.com/",
    },
    LinkedIn: {
      icon: <img className="icon-img" src={linkedinIcon} alt="LinkedIn" />,
      baseUrl: "https://linkedin.com/in/",
    },
    Twitter: {
      icon: <img className="icon-img" src={twitterIcon} alt="X" />,
      baseUrl: "https://twitter.com/",
    },
  };

  // const [socialLinks, setSocialLinks] = useState({});
  const [platformToAdd, setPlatformToAdd] = useState("");

  const handleAddPlatform = () => {
    if (platformToAdd && !socialLinks[platformToAdd]) {
      setSocialLinks(prev => ({ ...prev, [platformToAdd]: "" }));
    }
    setPlatformToAdd(""); // Close dropdown
  };

  const handleRemovePlatform = (platform) => {
    const updated = { ...socialLinks };
    delete updated[platform];
    setSocialLinks(updated);
  };

  const handleInputChange = (platform, value) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const availableOptions = Object.keys(socialPlatforms).filter(
    (platform) => !socialLinks[platform]
  );

  return (
    <div className="editprofile-box">
      <div className="inputDiv">
        <form>
          <label className="inputLabel">Modify Username </label>
          <input className="textInput createAccountTextInput" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>

          <label className="inputLabel"> New Password </label>
          <input className="textInput createAccountTextInput" type="password" placeholder="Type new password..." />

          <label className="inputLabel">Confirm New Password</label>
          <input className="textInput createAccountTextInput" type="password" placeholder="Confirm New Password..." />
        </form>

        <label className="inputLabel">Social Media Links</label>
        <div className="social-media-section">
          {Object.entries(socialLinks).map(([platform, username]) => (
            <div key={platform} className="social-input-row">
              {socialPlatforms[platform].icon}
              <span className="base-url">{socialPlatforms[platform].baseUrl}</span>
              <input
                className="social-input"
                type="text"
                value={username}
                onChange={(e) => handleInputChange(platform, e.target.value)}
                placeholder="your-handle"
              />
              <button className="remove-btn" type="button" onClick={() => handleRemovePlatform(platform)}>×</button>
            </div>
          ))}

          {availableOptions.length > 0 && (
            <div className="add-social-wrapper">
              <select
                value={platformToAdd}
                onChange={(e) => setPlatformToAdd(e.target.value)}
              >
                <option value="">Add social media...</option>
                {availableOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleAddPlatform} disabled={!platformToAdd}>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// EditAccount View - Edit Social Media
function SocialMediaInput() {
  return (
    <div className="editprofile-box">
      <div className="inputDiv">
        <label className="inputLabel">Social Media</label>
        <div className="icons-wrapper">
          {Object.entries(socialLinks).map(([platform, suffix]) => (
            <div className="icon-box" key={platform}>
              {socialPlatforms[platform].icon}
              <span className="base-url">{socialPlatforms[platform].baseUrl}</span>
              <input
                className="social-input"
                type="text"
                placeholder="your-username"
                value={suffix}
                onChange={(e) => handleInputChange(platform, e.target.value)}
              />
              <button className="remove-btn" onClick={() => handleRemovePlatform(platform)}>×</button>
            </div>
          ))}

          {/* Dropdown Add Button */}
          {Object.keys(socialPlatforms).length > Object.keys(socialLinks).length && (
            <div className="add-icon-dropdown">
              <button onClick={() => setPlatformToAdd("open")}>+</button>
              {platformToAdd === "open" && (
                <div className="dropdown-menu">
                  {Object.keys(socialPlatforms).filter(p => !(p in socialLinks)).map((platform) => (
                    <div
                      key={platform}
                      className="dropdown-item"
                      onClick={() => handleAddPlatform(platform)}
                    >
                      {socialPlatforms[platform].icon}
                      <span>{platform}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// EditAccount View - Edit Account Tab
function EditAccountTab( { currentUserName, currentLinks } ) {
  const [userName, setUserName] = useState(currentUserName);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    if (!(currentLinks === null)) {
      // Come back to this
    }
  });

  const editAccountHandler = (userName, socialLinks) => {
    const linkStarters = {github: "https://github.com/", twitter: "https://twitter.com/", linkedin: "https://linkedin.com/in/"};
    let linkArray = [];
    
    if ("Github" in socialLinks && socialLinks.Github.length > 0) {
      linkArray.push(linkStarters.github + socialLinks.Github);
    }

    if ("LinkedIn" in socialLinks && socialLinks.LinkedIn.length > 0) {
      linkArray.push(linkStarters.linkedin + socialLinks.LinkedIn);
    }

    if ("Twitter" in socialLinks && socialLinks.Twitter.length > 0) {
      linkArray.push(linkStarters.twitter + socialLinks.Twitter);
    }

    updateNameSocials(userName, linkArray);
  };

  return (
    <>
      <h2> Edit Account</h2>
      <InputBoxes 
        userName={userName}
        setUserName={setUserName}
        socialLinks={socialLinks}
        setSocialLinks={setSocialLinks}
      />
      <EditButtons handleSaveAction={() => editAccountHandler(userName, socialLinks)}/>
      <DeleteButton />
    </>
  );
}


// EditProfile View - Bash Selection
function BashSelection( { selectedColor, setSelectedColor} ) {
  const bashImages = [GreenBash, BlueBash, RedBash, OrangeBash, PurpleBash, PinkBash]
  const colorOptions = ["GREEN", "BLUE", "RED", "ORANGE", "PURPLE", "PINK"]

  const [selectedBash, setSelectedBash] = useState(bashImages[colorOptions.indexOf(selectedColor)]);

  const handleColorChange = (value) => {
    if (colorOptions.includes(value)) {
      setSelectedColor(value);
      setSelectedBash(bashImages[colorOptions.indexOf(value)]);
    }
  };

  return (
    <div className="editprofile-box"> 
      <div className="bashSelectionDiv">
      <img className="selectedBash" src={selectedBash} alt="Bash" />

      <form>
        {colorOptions.map((color) => (
            <input
              type="radio"
              className="colorSelectionRadio"
              id={color.toLowerCase()}
              name="colorSelection"
              value={color}
              checked={selectedColor === color}
              onChange={() => handleColorChange(color)}
            />
        ))}
      </form>
      <h3> Change Avatar</h3>
      </div>
    </div>
  );
}

// EditProfile View - Edit Bio
function BioInput( { currentBio, setCurrentBio } ) {
  return (
    <div className = "editprofile-box">
      <div className="inputDiv">
        <label className="inputLabel" htmlFor="bio">Edit Bio</label>
        <form action="" method="post">
          <textarea 
            className="textInput createAccountTextInput" 
            id="bio" name="bio" 
            value={currentBio} 
            onChange={e => setCurrentBio(e.target.value)}
            rows="4">
          </textarea>
        </form>
      </div>
    </div>
  );
}

// EditProfile View - Edit Profile Tab
function EditProfileTab( { existingBash, existingBio } ) {
  const [selectedColor, setSelectedColor] = useState(existingBash);
  const [currentBio, setCurrentBio] = useState(existingBio);

  const editProfileHandler = (color, bio) => {
    updateUserProfile(color, bio);
  };

  return (
    <>
      <h2> Edit Profile</h2>
      <BashSelection selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
      <BioInput currentBio={currentBio} setCurrentBio={setCurrentBio}/>
      <EditButtons handleSaveAction={() => editProfileHandler(selectedColor, currentBio)} />
    </>
  );
}



// Appearance View - Display Site 
const AppearanceSettings = () => (
  <div className="editprofile-box">
    <img className="selectedView" src={SiteViewGreen} alt="Site Preview" />
    <h3> Site Preview</h3>

  </div>
);

// Appearance View - Choose Theme
function InputTheme( { selectedOption, setSelectedOption } ) {
  const options = [
    { value: "displayLight", label: "Light Mode (Regular Mode)" },
    { value: "displayDark", label: "Dark Mode" }
  ];

  return (
    <div className = "editprofile-box">
      <div className="inputDiv">
        <Select
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
        />
      </div>
    </div>
  );
}

// Appearance View - Edit Appearance Tab
function EditAppearanceTab() {
  const [selectedOption, setSelectedOption] = useState(null);

  const editAppearanceHandler = (themeOption) => {
      let isLight = true;

      if (themeOption === null) {
          // Do nothing
      } else if (themeOption.value === "displayDark") {
        isLight = false;
      }

      updateUserAppearance(isLight);
  };

  return (
    <>
      <h2> Appearence</h2>
      <AppearanceSettings />
      <InputTheme selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <EditButtons handleSaveAction={() => editAppearanceHandler(selectedOption)} />
    </>
  );
}


// UserSettings Child Component
function UserSettingsChild( { existingProfile } ) {
  const [tab, setTab] = useState("editAccount"); // default to edit

  return (
    <div className = "settings-box"> 
      <div className="content-row">
        <div className="left-sidebar">
          <SettingsBar onSelect={setTab} />
        </div>
        <div className="right-sidebar">
          {tab === "editAccount" ? (
            <EditAccountTab 
              currentUserName={existingProfile.get("username")}
              currentLinks={existingProfile.get("links")}
            />
          ) : tab === "editProfile" ? (
            <EditProfileTab
              existingBash={existingProfile.get("profile_pic")}
              existingBio={existingProfile.get("bio")}
            />
          ) : (
            <EditAppearanceTab />
          )}
        </div>
      </div>
    </div>
  );
}

// Main UserSettings Component
const UserSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const existingProfile = useRef(new Map());

  useEffect(() => {
    const getProfileInfo = async () => {
      const profile_info = await getUserProfile();
      const map = new Map(Object.entries(profile_info[0]));
      existingProfile.current = map;
    }
    
    getProfileInfo();
    setTimeout(() => {setIsLoading(false)}, 500);
  }, []);

  return (
    <div>
      { isLoading ? <h1> Loading... </h1> : <UserSettingsChild existingProfile={existingProfile.current} /> }
    </div>
  );
};

export default UserSettings;
