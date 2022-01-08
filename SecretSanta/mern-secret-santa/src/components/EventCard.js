import React, { useState } from "react";
import "./HomePage.css";
import { connect } from "react-redux";

export const EventCard = ({ event}) => {

    const { name, creator, participants, joinStatus, date, month } = event;

    const [joinState, setJoinState] = useState(joinStatus);

    const isJoined = () => {
        if (joinState) {
            return "event-joined";
        } else {
            return "event-card-join-button";
        }
    }

    const handleClick = () => {
        if (joinState) {
            const index = participants.indexOf("User1");
            participants.splice(index, 1);
            setJoinState(false);
            // update joinstatus in backend
        } else {
            participants.push("User1");
            setJoinState(true);
            // update joinstatus in backend
        }
    }

    const participantsComponent = [];

    for (const [index, value] of participants.entries()) {
        participantsComponent.push(
            <div className="event-card-participant" key={index}>{value}</div>
        )
    }

    return (
        <div className="event-card-container">
            <div className="event-details">
                <div className="event-card-name">{name}</div>
                <div className="event-card-line"></div>
                <div className="event-card-creator">{creator}</div>
                <div className="event-card-participants-container">
                    {participantsComponent}
                </div>
                <div className={isJoined()} onClick={handleClick}>{joinState ? "Joined" : "Join"}</div>
            </div>
            <div className="event-card-date">
                <div className="event-card-date-number">
                    {date}
                </div>
                <div className="event-card-date-month">
                    {month}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.user.payload,
  });

export default connect(mapStateToProps)(EventCard);