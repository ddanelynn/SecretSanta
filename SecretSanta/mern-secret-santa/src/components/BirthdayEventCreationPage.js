import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import birthdayImage from '../assets/birthday.png'
import christmasImage from '../assets/christmas.png'
import "./BirthdayEventCreation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const BirthdayEventCreationPage = () => {

    const [eventDate, setEventDate] = useState(new Date());
    const [venue, setVenue] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [friends, setFriends] = useState([]);

    const navigate = useNavigate();
    const onAddEvent = () => {
        // todo
    }
    const addWishlist = () => {
        // todo
    }
    const showFriends = () => {
        // todo
    }

    return (
        <div className="event-creation-container">
            <div className="field-row">
                <div className="field-block">
                    <div className="field-label">Date and Time</div>
                    <DatePicker 
                        selected={eventDate} 
                        onChange={(date) => setEventDate(date)} 
                        showTimeSelect 
                        dateFormat="Pp"
                    />
                </div>
                <div className="field-block">
                    <div className="field-label">Venue</div>
                    <input
                        className="input"
                        type="text"
                        name="venue"
                        placeholder="Venue"
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </div>
            </div>
            <div className="field-row">
                <div className="big-field-block">
                    <div className="field-label">
                        Wishlist
                        <span><FontAwesomeIcon icon={faPlus} color="#F3F6ED" onClick={addWishlist}/></span>
                    </div>
                    <div className="big-input"></div>
                </div>
                <div className="big-field-block">
                    <div className="field-label">
                        Friends
                        <span><FontAwesomeIcon icon={faPlus} color="#F3F6ED" onClick={showFriends}/></span>
                    </div>
                    <div className="big-input"></div>
                </div>
            </div> 
            <div className="add-event-button" onClick={onAddEvent}>Add Event</div> 
        </div>
    )
}