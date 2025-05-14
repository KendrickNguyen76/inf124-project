import React from "react";
import "./UserSettings.css";
import { useState } from 'react';
import Select from "react-select";


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
function EditButtons() {
  return (
      <div className="edit-buttons">
        <button className="edit-button" type = "settings button">Cancel</button>
        <button className="edit-button" type = "settings button">Save Changes</button>
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
          <label className="inputLabel" htmlFor="name">Modify UserName</label>
          <input className="textInput createAccountTextInput" type="text" id="name" name="name" placeholder="<current UserName>..." />

          <label className="inputLabel" htmlFor="username">New Password</label>
          <input className="textInput createAccountTextInput" type="text" id="username" name="username" placeholder="Type new password..." />

          <label className="inputLabel" htmlFor="confirm_password">Confirm New Password</label>
          <input className="textInput createAccountTextInput" type="password" name="confirm_password" placeholder="Confirm New Password..." />
        </form>
      </div>
    </div>
  );
}
// EditAccount View - Edit Social Media
// function SocialMediaInput() {
//   return (
//     <div className = "editprofile-box">
//       <div className="inputDiv">

//       </div>
//     </div>
//   );
// }



// EditProfile View - Bash Selection
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
      <h3> Change Avatar</h3>
      </div>
    </div>
  );
}
// EditProfile View - Edit Bio

function BioInput() {
  return (
    <div className = "editprofile-box">
      <div className="inputDiv">
      </div>
    </div>
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
function InputTheme() {
  const [selectedOption, setSelectedOption] = useState(null);
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



// Main UserSettings Component
const UserSettings = () => {
  const [tab, setTab] = useState("editAccount"); // default to edit

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
            {/* <SocialMediaInput /> */}
            <EditButtons />
            <DeleteButton />
          </>
        ) : tab === "editProfile" ? (
          <>
            <h2> Edit Profile</h2>
            <BashSelection />
            <BioInput />
            <EditButtons />

          </>
        ) : (
          <>
            <h2> Appearence</h2>
            <AppearanceSettings />
            <InputTheme />
            <EditButtons />
          </>
        )}
        </div>
      </div>
    </div>
  );
};
export default UserSettings;