import React from "react";
import "./ComingSoon.css";
import {useNavigate} from 'react-router-dom';
import laptopBash from "../../assets/bash_loading.png";

const ComingSoonTitle = () => (
    <div className = "coming_soon_title">
        <h1> Multiplayer Features Coming Soon! </h1>
    </div>)

const LaptopBash = () => (
    <div className = "bash_laptop">
        <img src = {laptopBash} alt = "bashLoading" />
        <h1> Check Back for New Updates! </h1>
    </div>
)

const ReturntoDashButton = () =>
{
    const navigate = useNavigate();
    return(
        <div className = "dash_button">
            <button className = "back_dash" onClick = {() => navigate("/dashboard")}>
                Return to DashBoard
            </button>
        </div>
    )
}

const ComingSoon = () => {
    return (
        <div className = "coming_soon">
            <ComingSoonTitle/>
            <LaptopBash/>
            <ReturntoDashButton/>
        </div>
    )
};

export default ComingSoon;