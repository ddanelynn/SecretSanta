import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import Editable from "./Editable";
import { ListItem } from "./ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import WishlistsActions from "../reducers/WishlistsReducer";
import EventsActions from "../reducers/EventsReducer";
import { COLORS } from "../constants/Colors";

//TODO: Make title editable and add save list button
function ProfilePage(props) {
  const { userData, wishlistsRequest, userLists, eventsRequest, userEvents } =
    props;
  const { username, _id } = userData || {};
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const mark = [
    "2022-01-30T17:42:26.000+00:00",
    // '20-01-2022',
    // '31-01-2022'
  ];
  // const events = [{ name: "My 21st Birthday!!", date: }]

  useEffect(() => {
    axios
      .get("http://localhost:5000/wishlists")
      .then((res) => {
        const userLists = res.data.filter((list) => list.owner === _id);
        wishlistsRequest(userLists);
        // console.log(userLists)
      })
      .catch((err) => console.log(err));
  }, [userLists]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        const userEvents = res.data.filter((list) => list.owner === _id);
        eventsRequest(userEvents);
        // console.log(userLists)
      })
      .catch((err) => console.log(err));
  }, [userEvents]);

  const addList = () => {
    setShowModal(true);
  };

  const cancelInput = () => {
    setShowModal(false);
    setTitle("");
    setItems([]);
    setShowInput(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTitle(event.target.value);
      setShowInput(true);
    }
  };

  const handleNewItem = (event) => {
    if (event.key === "Enter") {
      addItemToList();
    }
  };

  const editItem = (item, indx) => {
    const temp = items;
    items[indx] = item;
    setItems(temp);
  };

  const deleteItem = (indx) => {
    setItems((items) => items.filter((_, i) => i !== indx));
  };

  const addItemToList = () => {
    let temp = items;
    temp = [...items, newItem];
    setItems(temp);
    setNewItem("");
  };

  const onSaveWishList = () => {
    const wishlist = {
      title: title,
      items: items,
      owner: _id,
    };

    axios
      .post("http://localhost:5000/wishlists/add", wishlist)
      .then((res) => {
        console.log("yay wihslist added!");
        setShowModal(false);
        setTitle("");
        setItems([]);
        setShowInput(false);
      })
      .catch((err) => console.log(err));
  };

  const goToList = (item) => {
    navigate("/wishlist", { state: { list_id: item._id } });
  };

  const goToEvent = (item) => {
    navigate("/event", { state: { event_id: item._id } });
  };

  const deleteWishList = (listId) => {
    axios
      .delete(`http://localhost:5000/wishlists/${listId}`)
      .then((res) => {
        console.log("yay wihslist deleted!");
      })
      .catch((err) => console.log(err));
  };

  console.log(userEvents);

  return (
    <div className="page-container">
      <Navbar />
      <div className="profile-page">
        <div className="top-section">
          <Modal
            isOpen={showModal}
            style={{
              content: {
                position: "absolute",
                top: "80px",
                left: "200px",
                right: "200px",
                bottom: "80px",
                border: "0px",
                background: "#F3F6ED",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                padding: "50px",
              },
            }}
            onRequestClose={closeModal}
          >
            <Editable
              style={{ marginBottom: 50 }}
              text={title}
              placeholder="Title of Wishlist"
              defaultEditable
              size="large"
            >
              <input
                className="wishlist-input"
                type="text"
                name="title"
                placeholder="Title of Wishlist"
                onKeyDown={(e) => handleKeyDown(e)}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Editable>
            <ul style={{ padding: 0 }}>
              {items.map((item, index) => (
                <div key={index}>
                  <ListItem
                    itemName={item}
                    indx={index}
                    editItem={editItem}
                    deleteItem={() => deleteItem(index)}
                  />
                </div>
              ))}
            </ul>
            {showInput && (
              <div>
                <input
                  style={{ marginTop: 40, marginBottom: 15 }}
                  className="wishlist-input"
                  type="text"
                  name="item"
                  placeholder="New item"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => handleNewItem(e)}
                />
                <div>
                  <button className="add-btn" onClick={addItemToList}>
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="btn-container">
              <button
                className="save-btn"
                style={{ marginRight: 25 }}
                onClick={() => cancelInput()}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={() => onSaveWishList()}>
                Save Wishlist!
              </button>
            </div>
          </Modal>
          <div>
            <div className="header-text">Hi, {username}!</div>
            <div className="wishlists-container">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 40,
                }}
              >
                <div>My Wishlists</div>
                <button className="add-wishlist-btn" onClick={addList}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {/* <ul style={{ padding: 0 }}> */}
              {userLists &&
                (userLists.length > 0 ? (
                  userLists.map((item, index) => (
                    <ul style={{ padding: 0 }}>
                      <div key={index} className="wishlist-item-element">
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            className="wishlist-item-btn"
                            onClick={() => goToList(item)}
                          >
                            <FontAwesomeIcon
                              icon={faCircle}
                              color={COLORS[index]}
                              style={{ marginRight: 20 }}
                            />
                            <div>{item.title}</div>
                          </button>
                          <button
                            className="wishlist-delete-btn"
                            onClick={() => deleteWishList(item._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                        <hr />
                      </div>
                    </ul>
                  ))
                ) : (
                  <div>No wishlists created yet</div>
                ))}
              {/* </ul> */}
            </div>
            <div className="wishlists-container">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 40,
                }}
              >
                <div>My Upcoming Events</div>
                <button
                  className="add-wishlist-btn"
                  onClick={() => navigate("/events")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <ul style={{ padding: 0 }}>
                {userEvents && userEvents.length > 0 ? (
                  userEvents.map((item, index) => (
                    <div key={index} className="wishlist-item-element">
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="wishlist-item-btn"
                          onClick={() => goToEvent(item)}
                        >
                          <div>{item.name}</div>
                        </button>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                          <div style={{ marginRight: 20 }}>
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                            }).format(new Date(item.date))}
                          </div>
                          <button
                            className="wishlist-delete-btn"
                            onClick={() => deleteWishList(item._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div>No events yet</div>
                )}
              </ul>
            </div>
          </div>
          <div className="calendar">
            <Calendar
              tileClassName={({ activeStartDate, date, view }) => {
                if (
                  mark.find(
                    (x) =>
                      date.getDay() === new Date(x).getDay() &&
                      date.getMonth() === new Date(x).getMonth() &&
                      date.getDate() === new Date(x).getDate()
                  )
                ) {
                  return "highlight";
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.user.payload,
  userLists: state.wishlists.payload,
  userEvents: state.events.payload,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    Object.assign(
      Object.assign(WishlistsActions),
      Object.assign(EventsActions)
    ),
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
