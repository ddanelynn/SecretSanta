import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./BirthdayEventCreation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

function BirthdayEventCreationPage(props) {
  const { userLists, userData } = props;
  const { _id } = userData;
  const [eventDate, setEventDate] = useState(new Date());
  const [venue, setVenue] = useState("");
  const [wishlist, setWishlist] = useState();
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [userWishlists, setUserWishlists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let temp = userLists;
    if (temp) {
      temp = temp.map((list) =>  ({ value: list._id, label: list.title }));
      console.log(temp);
      setUserWishlists(temp);
    }
  }, [userLists]);
  const onAddEvent = () => {
    const event = {
        owner: _id,
        name: name,
        venue: venue,
        date: eventDate,
        category: "birthday",
        guests: friends,
    }
    console.log(event)
    axios.post('http://localhost:5000/events/add', event)
        .then((res) => { 
          console.log('Woohoo event added!')
          navigate('/profile')
        })
        .catch((err) => console.log(err.response));
    // connect to backend, send 4 variables in useState
  };
  const handleSelectWishlist = (selectedOption) => {
    setWishlist(selectedOption.value);
    console.log(wishlist);
  };
  const handleFriendList = () => {
    const friendList = document.querySelector(".friends-list");
    if (friendList.style.display === "flex") {
      friendList.style.display = "none";
    } else {
      friendList.style.display = "flex";
    }
  };

  const addFriend = (friendName) => {
    const friendList = document.querySelector(".friends-list");
    friendList.style.display = "none";
    const friendListBlock = document.getElementById("friend-input-block");
    const newFriend = document.createElement("div");
    newFriend.setAttribute("class", "indiv-friend");
    newFriend.textContent = friendName;
    friendListBlock.appendChild(newFriend);
    setFriends([...friends, friendName]);
  };

  const FriendList = () => {
    const friendsCount = 3; //retrieve from backend
    const friends = ["amy", "bob", "claire"]; //retrieve from backend
    const friendsBlock = [];
    for (const [index, value] of friends.entries()) {
      friendsBlock.push(
        <div className="friend" key={index}>
          <div className="friend-name">{value}</div>
          <div className="friend-list-button" onClick={() => addFriend(value)}>
            Add
          </div>
        </div>
      );
    }
    if (friendsCount === 0) {
      return (
        <div className="friends-list">
          <div className="no-data">
            You have no friend. Add your first friend now!
          </div>
          <div className="friend-list-button" onClick={handleFriendList}>
            Close
          </div>
        </div>
      );
    } else {
      return <div className="friends-list">{friendsBlock}</div>;
    }
  };
 
  console.log(userLists);

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
                <div style={{display: "flex", flexDirection: "column"}}>
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
                            Wishlist
                        </div>
                        <Select options={userWishlists} 
                                onChange={handleSelectWishlist}/>
                    </div>
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
  );
}

const mapStateToProps = (state) => ({
  userLists: state.wishlists.payload,
  userData: state.user.payload,
});

export default connect(mapStateToProps)(BirthdayEventCreationPage);
