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
import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from "redux";
import WishlistsActions from "../reducers/WishlistsReducer"
import { COLORS } from "../constants/Colors";

//TODO: Make title editable and add save list button
function ProfilePage(props) {
  const { userData, wishlistsRequest, userLists } = props;
  const { username, _id } = userData || {};
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  // const events = [{ name: "My 21st Birthday!!", date: }]

  useEffect(() => {
    axios.get('http://localhost:5000/wishlists')
    .then((res) => { 
      const userLists = res.data.filter((list) => list.owner === _id)
      wishlistsRequest(userLists)
      // console.log(userLists)
    })
    .catch((err) => console.log(err));
  }, [userLists])


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
    console.log(items.filter((_, i) => i !== indx));
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
    console.log(item._id)
    navigate("/wishlist", { state: { list_id: item._id }})
  }

  console.log(userLists)

  return (
    <div className="page-container">
      <Navbar/>
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
            //type="input"
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
            <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', marginBottom: 40  }}>
              <div>My Wishlists</div>
              <button className="add-wishlist-btn" onClick={addList}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <ul style={{ padding: 0 }}>
            { userLists && userLists.map((item, index) => (
              <div key={index} className="wishlist-item-element">
                <button className="wishlist-item-btn" onClick={() => goToList(item)}>
                <FontAwesomeIcon icon={faCircle} color={COLORS[index]} style={{ marginRight: 20 }}/>
                <div>
                {item.title}
                </div>
                </button>
                <hr />
              </div>
            ))}
          </ul>
          </div>
          <div className="wishlists-container">
            <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between' }}>
              <div>My Upcoming Events</div>
              <button className="add-wishlist-btn" onClick={() => navigate("/events")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
        <div className="calendar">
          <Calendar />
        </div>
      </div>
    </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.user.payload,
  userLists: state.wishlists.payload,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Object.assign(WishlistsActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
