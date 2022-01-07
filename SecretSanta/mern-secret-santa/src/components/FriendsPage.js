import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FriendsPage.css";
import { ListItem } from "./ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "./Navbar";
import { COLORS } from "../constants/Colors";
import SearchBar from "./SearchBar";

//TODO: Make title editable and add save list button
const FriendsPage = () => {
    // const { userData, wishlistsRequest, userLists } = props;
    // const { username, _id } = userData || {};

    const [selectedFriendIndex, setSelectedFriendIndex] = useState(null)
    const [searchWords, setSearchWords] = useState("")
    const [listOfFriends, setListOfFriends] = useState([])
    const [listOfUsers, setListOfUsers] = useState([])

    // each friend object should contain Name, Birthday, EventsCreated, Photo (if time permits)

    useEffect(() => {
        setListOfFriends([
            {
                name: 'Ding Dong',
                birthday: '23/08/1999',
                events_created: []
            },
            {
                name: 'Ding Dong 2',
                birthday: '23/08/1999',
                events_created: []
            },
            {
                name: 'Ding Dong 2',
                birthday: '23/08/1999',
                events_created: []
            }
        ])
    }, [])


    // TODO: Get friends list

    //   useEffect(() => {
    //     axios.get('http://localhost:5000/friends')
    //     .then((res) => { 
    //       const userLists = res.data.filter((list) => list.owner === _id)
    //       wishlistsRequest(userLists)
    //       // console.log(userLists)
    //     })
    //     .catch((err) => console.log(err));
    //   }, [userLists])

    // TODO: Get list of users for search

    //   useEffect(() => {
    //     axios.get('http://localhost:5000/friends')
    //     .then((res) => { 
    //       const userLists = res.data.filter((list) => list.owner === _id)
    //       wishlistsRequest(userLists)
    //       // console.log(userLists)
    //     })
    //     .catch((err) => console.log(err));
    //   }, [userLists])

    // const onSaveWishList = () => {
    //     const wishlist = {
    //         title: title,
    //         items: items,
    //         owner: _id,
    //     };

    //     axios
    //         .post("http://localhost:5000/wishlists/add", wishlist)
    //         .then((res) => {
    //             console.log("yay wihslist added!");
    //             setShowModal(false);
    //             setTitle("");
    //             setItems([]);
    //             setShowInput(false);
    //         })
    //         .catch((err) => console.log(err));
    // };

    const handleClickFriend = () => {
        return null
    }

    // const getFriendName = () => {
    //     return 'Hello'
    // }

    const numOfFriends = listOfFriends.length;


    return (
        <>
            <div className="page-container">
                <Navbar />
                <div className="friends-page">
                    <div className="friends-left-container">
                        <div className="searchBarContainer">
                            <SearchBar />
                        </div>
                        <div className="friendsContainer">
                            <div className="card-mini-header">{numOfFriends} Friends</div>
                            <ul style={{ padding: 0, overflow: 'scroll', marginBottom: 0 }}>
                                {listOfFriends && listOfFriends.map((item, index) => (
                                    <div key={index} className="friend-item-element">
                                        <button className="friend-item-btn" onClick={() => handleClickFriend(index)}>
                                            {index + 1}:{item.name}
                                        </button>
                                    </div>
                                ))}
                            </ul>
                            {/* <div className="wishlists-container">
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between' }}>
                <div>My Upcoming Events</div>
                <button className="add-wishlist-btn" onClick={() => navigate("/events")}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                </div>
            </div> */}
                        </div>
                    </div>
                    <div className="profileDetails">
                        <div className="friendsContainer maxWidth">
                            <div className="friend-details-card">
                                {/* {listOfFriends && selectedFriendIndex && listOfFriends[selectedFriendIndex]} */}
                                {listOfFriends == null || selectedFriendIndex == null &&
                                    <div className="friendNotSelectedContainer centerText">
                                        <div>
                                        Select a friend to view his/her details.
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// const mapStateToProps = (state) => ({
//   userData: state.user.payload,
//   userLists: state.wishlists.payload,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(Object.assign(WishlistsActions), dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default FriendsPage;