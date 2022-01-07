import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectedlistActions from "../reducers/SelectedlistReducer";
import { Navbar } from "./Navbar";
import "./WishlistPage.css";
import { ListItem } from "./ListItem";
import Editable from "./Editable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import backArrow from '../assets/back-arrow.png'

function WishlistPage(props) {
  const { state } = useLocation();
  const { list_id } = state;
  const { selectedlistRequest, wishlist } = props;
  const { title, items, owner } = wishlist || {};
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedItems, setEditedItems] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${list_id}`, list_id)
      .then((res) => {
        selectedlistRequest(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setEditedTitle(title);
    if (items) {
      setEditedItems([...items]);
    }
  }, [wishlist]);

  const editItem = (item, index) => {
    let temp = editedItems;
    temp[index] = item;
    setEditedItems((editedItems) => editedItems.map((curr, i) => i === index ? item : curr));
  };

  const deleteItem = (indx) => {
    // console.log(items.filter((_, i) => i !== indx));
    setEditedItems((editedItems) => editedItems.filter((_, i) => i !== indx));
  };

  const handleNewItem = (event) => {
    if (event.key === "Enter") {
      addNewItem();
    }
  };

  const addNewItem = () => {
    let temp = editedItems;
    temp = [...editedItems, newItem];
    setEditedItems(temp);
    setNewItem("");
  };

  const hideSaved = () => {
    setShowSaved(false);
  };

  const stopLoading = () => {
    setSaving(false);
    setEditing(false);
    setShowSaved(true);
    setTimeout(hideSaved, 1500);
  };

  const editList = () => {
    setShowSaved(false);
    setEditing(true);
  };

  const onGoBack = () => {
    navigate("/profile")
  }
  const saveEdits = () => {
    const wishlist = {
      title: editedTitle,
      items: editedItems,
      owner: owner,
    };

    axios
      .post(`http://localhost:5000/wishlists/update/${list_id}`, wishlist)
      .then((res) => {
        console.log("yay wihslist added!");
        setSaving(true);
        setTimeout(stopLoading, 1500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="wishlist-container">
      <Navbar />
      <div className="wishlist-page">
        <button className="back-btn" onClick={() => onGoBack()}>
        <img className="back-image" src={backArrow}/>
        </button>
        {isEditing ? (
          <div className="item-line">
            <Editable
              text={editedTitle}
              placeholder={editedTitle}
              type="input"
              defaultEditable
              size="large"
              color="white"
            >
              <input
                className="wishlist-input-edit"
                type="text"
                name="title"
                placeholder={editedTitle}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Editable>
            <button className="add-btn" onClick={() => saveEdits()}>
              {saving ? <div>Saving...</div> : <div>Save</div>}
            </button>
          </div>
        ) : (
          <div className="item-line">
            <div className="list-header-text">{title}</div>
            {showSaved ? (
              <div className="saved-indicator">Saved!<FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: 10}}/></div>
            ) : (
              <button className="add-btn" onClick={() => editList()}>
                Edit
              </button>
            )}
          </div>
        )}
        <div className="wishlist-items-container">
          <ul style={{ padding: 0 }}>
            {editedItems &&
              editedItems.map((item, index) =>
                isEditing ? (
                  <ListItem
                    key={index}
                    itemName={item}
                    deleteItem={() => deleteItem(index)}
                    editItem={editItem}
                    indx={index}
                  />
                ) : (
                  <div>
                    <div className="wishlist-item-element">{item}</div>
                    <hr />
                  </div>
                )
              )}
          </ul>
          {isEditing && (
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
              <button className="add-btn" onClick={() => addNewItem()} style={{ marginLeft: -640 }}>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishlist: state.selectedList.payload,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Object.assign(SelectedlistActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
