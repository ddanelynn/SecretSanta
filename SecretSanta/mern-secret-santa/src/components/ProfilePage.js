import React, { useState } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

//TODO: Make title editable and add save list button
function ProfilePage(props) {
  const { userData } = props;
  const { username } = userData || {};
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const addList = () => {
    setShowModal(true);
  };

  const addItem = () => {
    setShowInput(!showInput);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTitle(event.target.value);
    }
  };

  const handleNewItem = (event) => {
    if (event.key === "Enter") {
      addItemToList();
    }
  };

  const addItemToList = () => {
    let temp = items;
    temp = [...items, newItem];
    setItems(temp);
    setNewItem("");
  };

  return (
    <div className="profile-page">
      <div className="top-section">
        <Modal
          isOpen={showModal}
          style={{
            content: {
              position: "absolute",
              top: "80px",
              left: "80px",
              right: "80px",
              bottom: "80px",
              border: "0px",
              background: "#F3F6ED",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "50px",
            },
          }}
          // className="add-wishlist-modal"
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          // contentLabel="Example Modal"
        >
          {title.length === 0 ? (
            <input
              className="wishlist-input"
              type="text"
              name="title"
              placeholder="Title of Wishlist"
              onKeyDown={(e) => handleKeyDown(e)}
              //onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <div className="wishlist-title">{title}</div>
          )}
          <ul style={{ padding: 0 }}>
            {items.map((item, index) => (
                <div>
              <div className="list-item" key={index}>{item}</div>
              <hr/>
              </div>
            ))}
          </ul>
          <button className="add-item-btn" onClick={addItem}>
            <div>+ Add Item</div>
          </button>
          {showInput && (
            <div>
              <input
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
              <button className="add-btn" onClick={() => setShowInput(false)}>
                Cancel
              </button>
              </div>
            </div>
          )}
        </Modal>
        <div>
          <div className="header-text">Hi, {username}!</div>
          <div className="wishlists-container">
            <div style={{ flexDirection: "row", display: "flex" }}>
              <div>My Wishlists</div>
              <button className="add-wishlist-btn" onClick={addList}>
                <div>+</div>
              </button>
            </div>
          </div>
        </div>
        <div className="calendar">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.user.payload,
});

export default connect(mapStateToProps)(ProfilePage);
