import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import birthdayImage from '../assets/birthday.png'
import christmasImage from '../assets/christmas.png'
import "./EventCreation.css";
import { Navbar } from "./Navbar";

export const EventCreationPage = () => {
    const navigate = useNavigate();
    const goToSecretSanta = () => {
        navigate('/home')
    }
    const goToBirthday = () => {
        navigate('/sign-up')
    }

    return (
        <div className="page-container">
            <Navbar />
        <div className="event-creation-container">
            <div className="event-block">
                <div className="event-bubble" onClick={goToBirthday}>
                    <img className="event-image" src={christmasImage}/>
                </div>
                <div className="event-title">Secret Santa</div>
            </div>
            <div className="event-block">
                <div className="event-bubble" onClick={goToSecretSanta}>
                    <img className="event-image" src={birthdayImage}/>
                </div>
                <div className="event-title">Birthday</div>
            </div>
        </div>
        </div>
    )
}