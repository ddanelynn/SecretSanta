import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./FriendsPage.css";
import { ListItem } from "./ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "./Navbar";
import { COLORS } from "../constants/Colors";
import SearchBar from "./SearchBar";
import { tr } from "date-fns/locale";

//TODO: Make title editable and add save list button
const FriendsPage = () => {
    // const { userData, wishlistsRequest, userLists } = props;
    // const { username, _id } = userData || {};

    const [selectedUserId, setSelectedUserId] = useState(null)
    const [searchWords, setSearchWords] = useState("")
    const [onlyFriends, setonlyFriends] = useState(true)
    const [listOfFriends, setListOfFriends] = useState([
        {
            name: 'Ding Dong',
            birthday: '23/07/1999',
            eventsCreated: [{ name: 'event1' }, { name: 'event2' }],
            userId: 0
        },
        {
            name: 'Danelynn',
            birthday: '21/05/2000',
            eventsCreated: [],
            userId: 1
        },
        {
            name: 'Tasha',
            birthday: '19/01/2000',
            eventsCreated: [],
            userId: 2
        }
    ])
    const [listOfUsers, setListOfUsers] = useState([
        {
            name: 'Ding Dong',
            birthday: '23/07/1999',
            eventsCreated: [{ name: 'event1' }, { name: 'event2' }],
            userId: 0
        },
        {
            name: 'Danelynn',
            birthday: '21/05/2000',
            eventsCreated: [],
            userId: 1
        },
        {
            name: 'Tasha',
            birthday: '19/01/2000',
            eventsCreated: [],
            userId: 2
        },
        {
            name: 'Tom',
            birthday: '13/06/1999',
            eventsCreated: [],
            userId: 3
        },
        {
            name: 'Timmy',
            birthday: '30/05/1999',
            eventsCreated: [],
            userId: 4
        },
        {
            name: 'Tricia',
            birthday: '31/05/1998',
            eventsCreated: [],
            userId: 5
        },
    ])
    const [filteredList, setfilteredList] = useState([])


    // each friend object should contain Name, Birthday, EventsCreated, Photo (if time permits)

    // useEffect(() => {
    //     console.log('Stimulate Get Friend List')
    //     setListOfFriends([
    //         {
    //             name: 'Ding Dong',
    //             birthday: '23/08/1999',
    //             eventsCreated: [{name: 'event1'}, {name: 'event2'}]
    //         },
    //         {
    //             name: 'Ding Dong 2',
    //             birthday: '23/08/1999',
    //             eventsCreated: []
    //         },
    //         {
    //             name: 'Ding Dong 3',
    //             birthday: '23/08/1999',
    //             eventsCreated: []
    //         }
    //     ])
    // }, [])

    useEffect(() => {
        // console.log('in useEffect')

        // BUG: Don't know why cannot fetch latest state set by other useEffect

        let filteredList = listOfUsers
        if (searchWords.trim() !== "") {
            filteredList = listOfUsers.filter(user => {
                return user.name.toLowerCase().includes(searchWords.trim().toLowerCase())
            })
        }
        setfilteredList(filteredList)
        setSelectedUserId(null)
    }, [searchWords])

    useEffect(() => {
        // console.log('in setonlyfriends')
        if (searchWords.trim() === "") {
            setonlyFriends(true)
        } else {
            setonlyFriends(false)
        }
    }, [searchWords])

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

    const handleClickFriend = (index) => {
        setSelectedUserId(index)
    }

    const handleTyping = (searchWords) => {
        setSearchWords(searchWords)
    }

    const getFriendDetails = () => {
        console.log('in friendDetails')
        let userObj = listOfUsers[selectedUserId]
        let isFriend = false
        let friendCheck = listOfFriends.filter(friend => friend.userId === selectedUserId)
        if (friendCheck.length === 1) {
            isFriend = true
        }

        console.log(userObj)
        let eventsCreated = userObj.eventsCreated
        return (
            <>
                <div className="friendDetailsCardName">{userObj.name}</div>
                <div>Birthday: {userObj.birthday}</div>
                {isFriend &&
                <>
                <div>Events Created: {eventsCreated.length === 0 && '-'}</div>
                <ul style={{ padding: 0 }}>
                    {eventsCreated &&
                        eventsCreated.map((item, index) => (
                            <div key={index} className="wishlist-item-element">
                                <div
                                    style={{
                                        flexDirection: "row",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div
                                        className="friend-item-btn"
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            color={COLORS[index]}
                                            style={{ marginRight: 20 }}
                                        />
                                        <div>{item.name}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </ul>
                </>
                }
            </>
        )
    }

    const numOfFriends = listOfFriends.length;


    return (
        <>
            <div className="page-container">
                <Navbar />
                <div className="friends-page">
                    <div className="friends-left-container">
                        <div className="searchBarContainer">
                            <SearchBar
                                setKeyword={handleTyping}
                            />
                        </div>
                        <div className="friendsContainer">
                            {onlyFriends && <div className="card-mini-header">{numOfFriends} Friends</div>}
                            {!onlyFriends && <div className="card-mini-header">Users with name matching '{searchWords}':</div>}
                            <ul style={{ padding: 0, overflowY: 'scroll', marginBottom: 0 }}>
                                {onlyFriends && listOfFriends && listOfFriends.map((item, index) => (
                                    <div key={index} className="friend-item-element">
                                        <button className="friend-item-btn" onClick={() => handleClickFriend(item.userId)}>
                                            {index + 1}: {item.name}
                                        </button>
                                    </div>
                                ))}
                                {!onlyFriends && filteredList && filteredList.map((item, index) => (
                                    <div key={index} className="friend-item-element">
                                        <button className="friend-item-btn" onClick={() => handleClickFriend(item.userId)}>
                                            {index + 1}:{item.name}
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="profileDetails">
                        <div className="friendsContainer maxWidth">
                            <div className="friend-details-card">
                                {filteredList && selectedUserId != null && getFriendDetails()}
                                {filteredList == null || selectedUserId == null &&
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