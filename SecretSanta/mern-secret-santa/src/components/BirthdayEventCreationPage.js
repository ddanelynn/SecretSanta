import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import birthdayImage from '../assets/birthday.png'
import christmasImage from '../assets/christmas.png'
import "./BirthdayEventCreation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

export const BirthdayEventCreationPage = () => {

    const [eventDate, setEventDate] = useState(new Date());
    const [venue, setVenue] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [friends, setFriends] = useState([]);

    const navigate = useNavigate();
    const onAddEvent = () => {
        // todo
        const items = document.querySelectorAll('wishlist-item');
        const wishlistArr = [];
        items.forEach((item) => {
            wishlistArr.push(item.id);
        });
        setWishlist(wishlistArr);
    }
    const addWishlist = () => {
        // todo
        const wishlistBlock = document.getElementById('wishlist-input-block');
        const newItem = document.createElement('input');
        newItem.setAttribute('placeholder',)
        newItem.setAttribute('class', 'wishlist-item');
        newItem.addEventListener('input', (e) => {
            e.target.id = e.target.value
        });
        wishlistBlock.appendChild(newItem);
    }
    const handleFriendList = () => {
        // todo
        const friendList = document.querySelector('.friends-list');
        if (friendList.style.display === 'flex') {
            friendList.style.display = 'none';
        } else {
            friendList.style.display = 'flex';
        }
    }

    const addFriend = () => {
        const friendList = document.querySelector('.friends-list');
        friendList.style.display = "none";
        const friendListBlock = document.getElementById('friend-input-block');
        const newFriend = document.createElement('div');
        newFriend.setAttribute('class', 'indiv-friend');
        newFriend.textContent = "hi";
        friendListBlock.appendChild(newFriend);
    }

    const FriendList = () => {
        const friendsCount = 3; //retrieve from backend
        const friends = ["amy", "bob", "claire"]; //retrieve from backend
        const friendsBlock = [];
        for (const [index, value] of friends.entries()) {
            friendsBlock.push(
                <div className="friend">
                    <div className="friend-name">{value}</div>
                    <div className="friend-list-button" onClick={addFriend}>Add</div>
                </div>
            )
        }
        if (friendsCount === 0) {
            return(
                <div className="friends-list">
                    <div className="no-data">You have no friend. Add your first friend now!</div>
                    <div className="friend-list-button" onClick={handleFriendList}>Close</div>
                </div>
            )
        } else {
            return(
                <div className="friends-list">
                    {friendsBlock}
                </div>
            )
        }
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
                        <span><FontAwesomeIcon className="add-icon" icon={faPlus} color="#F3F6ED" onClick={addWishlist}/></span>
                    </div>
                    <div className="big-input" id="wishlist-input-block"></div>
                </div>
                <div className="big-field-block">
                    <div className="field-label">
                        Friends
                        <span><FontAwesomeIcon className="add-icon" icon={faPlus} color="#F3F6ED" onClick={handleFriendList}/></span>
                    </div>
                    <div className="big-input" id="friend-input-block">
                        <FriendList/>
                    </div>
                </div>
            </div> 
            <div className="add-event-button" onClick={onAddEvent}>Add Event</div> 
        </div>
    )
}