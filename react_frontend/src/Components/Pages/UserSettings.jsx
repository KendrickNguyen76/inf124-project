import React from "react";
import "./UserSettings.css";
import { useState } from 'react';



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



// Left Column
const SettingsBar = ({ activeTab, onSelect }) => {
  return (
    <div className="settings-bar">
      <h2>Settings</h2>
      <div 
        className={`selection-box ${activeTab === 'edit' ? 'edit-active' : ''}`} 
        onClick={() => onSelect("edit")}
      >
        <div className="edit-profile-heading">
          <FiEdit />
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

// Right Column

// EditProfile View
function BashSelection() {
  const bashImages = [GreenBash, BlueBash, RedBash, OrangeBash, PurpleBash, PinkBash]
  const colorOptions = ["Green", "Blue", "Red", "Orange", "Purple", "Pink"]

  const [selectedColor, setSelectedColor] = useState('Green');
  const [selectedBash, setSelectedBash] = useState(bashImages[0]);

  const handleColorChange = (value) => {
    if (colorOptions.includes(value)) {
      setSelectedColor(value);
      setSelectedBash(bashImages[colorOptions.indexOf(value)]);
    }
  };

  return (
    <div className="editprofile-box"> 
      <h2> Edit Profile</h2>
      <div className="bashSelectionDiv">
      <img className="selectedBash" src={selectedBash} alt="Bash" />

      <form>
        {['Green', 'Blue', 'Red', 'Orange', 'Purple', 'Pink'].map((color) => (
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
      </div>
      <h3> Change Avatar</h3>
    </div>
  );
}

function InputBoxes() {
  return (
    <div className = "editprofile-box">
      <div className="inputDiv">
        <form action="" method="post">
          <label className="inputLabel" htmlFor="name">Modify UserName</label>
          <input className="textInput createAccountTextInput" type="text" id="name" name="name" placeholder="<current UserName>..." />

          <label className="inputLabel" htmlFor="username">New Password</label>
          <input className="textInput createAccountTextInput" type="text" id="username" name="username" placeholder="Type new password..." />

          <label className="inputLabel" htmlFor="confirm_password">Confirm New Password</label>
          <input className="textInput createAccountTextInput" type="password" name="confirm_password" placeholder="Confirm New Password..." />
        </form>
      </div>
      <div className="edit-buttons">
      <button className="edit-button" type = "settings button">Cancel</button>
        <button className="edit-button" type = "settings button">Save Changes</button>
      </div>
    </div>
  );
}


// Appearance View
const AppearanceSettings = () => (
  <div className="editprofile-box">
    <h2>Appearance </h2>
    <img className="selectedView" src={SiteViewGreen} alt="Bash" />
    <h3> Site Preview</h3>

  </div>
);

function InputTheme() {
  return (
    <div className = "editprofile-box">
      <div className="inputDiv">
        <form action="" method="post">
          <label className="inputLabel" htmlFor="name">Select Theme</label>
          <input className="textInput createAccountTextInput" type="text" id="name" name="name" placeholder="<current theme>..." />
        </form>
      </div>
      <div className="edit-buttons">
      <button className="edit-button" type = "settings button">Cancel</button>
        <button className="edit-button" type = "settings button">Save Changes</button>
      </div>
    </div>
  );
}

const UserSettings = () => {
  const [tab, setTab] = useState("edit"); // default to edit

  return (
    <div className = "settings-box"> 
    <div className="content-row">
      <div className="left-sidebar">
        <SettingsBar onSelect={setTab} />
        </div>
      <div className="right-sidebar">
        {tab === "edit" ? (
          <>
            <BashSelection />
            <InputBoxes />
          </>
        ) : (
          <>
            <AppearanceSettings />
            <InputTheme />
          </>
        )}
        </div>
      </div>
    </div>
  );
};
export default UserSettings;