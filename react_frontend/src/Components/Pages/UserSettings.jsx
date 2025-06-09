import React from "react";
import "./UserSettings.css";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { getUserProfile, updateUserProfile, updateUserAppearance } from './modules/userSettingsCrud';

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
function InputBoxes() {
  return (
    <div className = "editprofile-box">
      <div className="inputDiv">
        <form action="" method="post">
          <label className="inputLabel" htmlFor="name"> Modify UserName </label>
          <input className="textInput createAccountTextInput" type="text" id="name" name="name" placeholder="<current UserName>..." />

          <label className="inputLabel" htmlFor="username"> New Password</label>
          <input className="textInput createAccountTextInput" type="text" id="username" name="username" placeholder="Type new password..." />

          <label className="inputLabel" htmlFor="confirm_password">Confirm New Password</label>
          <input className="textInput createAccountTextInput" type="password" name="confirm_password" placeholder="Confirm New Password..." />
        </form>
      </div>
    </div>
  );
}


// EditAccount View - Edit Social Media
function SocialMediaInput() {
const iconMapping = {
  GitLab: <img className="icon-img" src={giticon} alt="LinkedIn" />,
  LinkedIn: <img className="icon-img" src={linkedinIcon} alt="LinkedIn" />,
  Twitter: <img className="icon-img" src={twitterIcon} alt="X" />
};


  const allIcons = Object.keys(iconMapping);
  const [selectedIcons, setSelectedIcons] = useState(["GitLab", "LinkedIn", "Twitter"]);

  const addIcon = () => {
    const remainingIcons = allIcons.filter(icon => !selectedIcons.includes(icon));
    if (remainingIcons.length > 0) {
      const nextIcon = remainingIcons[0]; // Or use Math.random() to pick randomly
      setSelectedIcons([...selectedIcons, nextIcon]);
    }
  };

  const removeIcon = (icon) => {
    setSelectedIcons(selectedIcons.filter(i => i !== icon));
  };

  return (
    <div className="editprofile-box">
      <div className="inputDiv">
        <label className="inputLabel" htmlFor="name">Social Media</label>
        <div className="icons-wrapper">
          {selectedIcons.map((icon) => (
            <div className="icon-box" key={icon}>
              {iconMapping[icon]}
              <button className="remove-btn" onClick={() => removeIcon(icon)}>×</button>
            </div>
          ))}
          {selectedIcons.length < allIcons.length && (
            <button className="add-icon" onClick={addIcon}>+</button>
          )}
        </div>
      </div>
    </div>
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


// Handler functions for saving settings
const editAccountHandler = () => {
  console.log("Hello, this is what is called when you hit save on the Edit Account page");
}



// Main UserSettings Component
const UserSettings = () => {
  const [tab, setTab] = useState("editAccount"); // default to edit
  const existingProfile = useRef(new Map());

  // How in the world do i store the information i want from getUserProfile
  // Without triggering a billion rerenders???
  useEffect(() => {
    const getProfileInfo = async () => {
      const profile_info = await getUserProfile();
      const map = new Map(Object.entries(profile_info[0]));
      existingProfile.current = map;
    }

    getProfileInfo();
  }, []);

  return (
    <div className = "settings-box"> 
    <div className="content-row">
      <div className="left-sidebar">
        <SettingsBar onSelect={setTab} />
        </div>
      <div className="right-sidebar">
        {tab === "editAccount" ? (
          <>
            <h2> Edit Account</h2>
            <InputBoxes />
            <SocialMediaInput />
            <EditButtons handleSaveAction={editAccountHandler}/>
            <DeleteButton />
          </>
        ) : tab === "editProfile" ? (
          <EditProfileTab
            existingBash={existingProfile.current.get("profile_pic")}
            existingBio={existingProfile.current.get("bio")}
          />
        ) : (
            <EditAppearanceTab />
        )}
        </div>
      </div>
    </div>
  );
};
export default UserSettings;
