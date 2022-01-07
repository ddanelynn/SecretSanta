import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import "./BirthdayEventCreation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function SecretSantaEventCreationPage(props) {
    const { userData } = props
    const { _id } = userData
    const [eventDate, setEventDate] = useState(new Date());
    const [venue, setVenue] = useState("");
    const [friends, setFriends] = useState([]);
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const onAddEvent = () => {
        const event = {
            owner: _id,
            venue: venue,
            date: eventDate,
            guests: friends,
            category: 'santa',
        }
        console.log(event)
        axios.post('http://localhost:5000/events/add', event)
        .then((res) => { 
          console.log('Woohoo event added!')
        })
        .catch((err) => console.log(err));
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

    return (
        <div className="birthday-event-creation-container">
            <div className="field-row">
                <div className="field-block">
                    <div className="field-label">Name</div>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field-block">
                    <div className="field-label">Date and Time</div>
                    <DatePicker 
                        selected={eventDate} 
                        onChange={(date) => setEventDate(date)} 
                        showTimeSelect 
                        dateFormat="Pp"
                    />
                </div>
            </div>
            <div className="field-row">
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
                <div className="big-field-block">
                    <div className="field-label">
                        Participants
                        <span><FontAwesomeIcon className="add-icon" icon={faPlus} color="#F3F6ED" onClick={handleFriendList}/></span>
                    </div>
                    <div className="big-input" id="friend-input-block">  
                    </div>
                    <FriendList/>
                </div>
            </div> 
            <div className="add-event-button" onClick={onAddEvent}>Add Event</div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.user.payload,
  });

export default connect(mapStateToProps)(SecretSantaEventCreationPage);
