import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./BirthdayEventCreation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

export const BirthdayEventCreationPage = () => {

    const [eventDate, setEventDate] = useState(new Date());
    const [venue, setVenue] = useState("");
    const [wishlist, setWishlist] = useState();
    const [friends, setFriends] = useState([]);

    const navigate = useNavigate();
    const onAddEvent = () => {
        // connect to backend, send 4 variables in useState
    
    }
    const handleSelectWishlist = (selectedOption) => {
        setWishlist(selectedOption.value)
        console.log(wishlist)
    }
    const handleFriendList = () => {
        const friendList = document.querySelector('.friends-list');
        if (friendList.style.display === 'flex') {
            friendList.style.display = 'none';
        } else {
            friendList.style.display = 'flex';
        }
    }

    const addFriend = (friendName) => {
        const friendList = document.querySelector('.friends-list');
        friendList.style.display = "none";
        const friendListBlock = document.getElementById('friend-input-block');
        const newFriend = document.createElement('div');
        newFriend.setAttribute('class', 'indiv-friend');
        newFriend.textContent = friendName;
        friendListBlock.appendChild(newFriend);
        setFriends([...friends, friendName]);
    }

    const FriendList = () => {
        const friendsCount = 3; //retrieve from backend
        const friends = ["amy", "bob", "claire"]; //retrieve from backend
        const friendsBlock = [];
        for (const [index, value] of friends.entries()) {
            friendsBlock.push(
                <div className="friend" key={index}>
                    <div className="friend-name">{value}</div>
                    <div className="friend-list-button" onClick={() => addFriend(value)}>Add</div>
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
    // get wishlist from backend
    const myWishlists = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];
    

    return (
        <div className="birthday-event-creation-container">
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
                    </div>
                    <Select options={myWishlists} 
                            onChange={handleSelectWishlist}/>
                </div>
                <div className="big-field-block">
                    <div className="field-label">
                        Friends
                        <span><FontAwesomeIcon className="add-icon" icon={faPlus} color="#F3F6ED" onClick={handleFriendList}/></span>
                    </div>
                    <div className="big-input" id="friend-input-block"></div>
                    <FriendList/>
                </div>
            </div> 
            <div className="add-event-button" onClick={onAddEvent}>Add Event</div> 
        </div>
    )
}