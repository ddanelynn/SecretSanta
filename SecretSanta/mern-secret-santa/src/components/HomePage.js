import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import { Navbar } from "./Navbar";
import { EventCard } from "./EventCard";

export const HomePage = () => {
    const events = [
        {
            name: "Jerry's Birthday", 
            creator: "JerryBerry", 
            participants: ["Ben", "Tom", "JerryTriplet"], 
            joinStatus: false, 
            date: "25", 
            month: "December"
        },
        {
            name: "Jerry's Christmas", 
            creator: "JerryBerries", 
            participants: ["berry", "Tom", "JerryTriplet"], 
            joinStatus: true, 
            date: "20", 
            month: "March"
        },
    ]

    const eventCards = [];

    for (const [index, value] of events.entries()) {
        eventCards.push(
            <EventCard event={value} />
        )
    }

    return (
        <div className="feed-page-container">
            <Navbar />
            {eventCards}
        </div>
    )
}
