import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import { Navbar } from "./Navbar";
import EventCard from "./EventCard";

export const HomePage = () => {
    const events = [
        {
            name: "Tasha's Birthday", 
            creator: "Tasha", 
            participants: ["user1", "Danelynn", "Tasha"], 
            joinStatus: true, 
            date: "19", 
            month: "January"
        },
        {
            name: "Christmas", 
            creator: "Ding Dong", 
            participants: ["Danelynn"], 
            joinStatus: false, 
            date: "25", 
            month: "December"
        },
        {
            name: "Children's Day", 
            creator: "Ding Dong", 
            participants: ["Danelynn", "user1"], 
            joinStatus: true, 
            date: "20", 
            month: "September"
        },
        {
            name: "My 22nd Birthday", 
            creator: "user1", 
            participants: ["Danelynn", "Ding Dong", "Tasha"], 
            joinStatus: false, 
            date: "31", 
            month: "January"
        }
    ]

    const eventCards = [];

    for (const [index, value] of events.entries()) {
        eventCards.push(
            <EventCard event={value} />
        )
    }

    const navigate = useNavigate();
    const gotoEventCreation = () => {
        navigate('/events')
    }

    return (
        <div className="feed-page-container">
            <Navbar />
            <div className="feed-page-content">
                <div className="event-card-wrapper">
                    {eventCards}
                </div>
                <div className="create-event-button" onClick={gotoEventCreation}>Create an Event</div>
            </div>
        </div>
    )
}
