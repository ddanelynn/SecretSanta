import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectedlistActions from "../reducers/SelectedlistReducer";
import { Navbar } from "./Navbar";
import "./WishlistPage.css";
import { ListItem } from "./ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import Editable from "./Editable";

function WishlistPage(props) {
  const { state } = useLocation();
  const { list_id } = state;
  const { selectedlistRequest, wishlist } = props;
  const { title, items, owner } = wishlist || {};
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedItems, setEditedItems] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${list_id}`, list_id)
      .then((res) => {
        selectedlistRequest(res.data);
      })
      .catch((err) => console.log(err));
  }, [wishlist]);

  useEffect(() => {
    setEditedTitle(title);
    if (items) {
      setEditedItems([...items]);
    }
  }, [wishlist]);

  const editItem = (item, index) => {
    let temp = editedItems;
    temp[index] = item;
    setEditedItems(temp);
    const wishlist = {
      title: editedTitle,
      items: temp,
      owner: owner,
    };

    axios
      .post(`http://localhost:5000/wishlists/update/${list_id}`, wishlist)
      .then((res) => {
        console.log("yay wihslist added!");
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = (indx) => {
    console.log(indx);
    // console.log(items.filter((_, i) => i !== indx));
    const temp = editedItems.filter((_, i) => i !== indx);
    const wishlist = {
      title: editedTitle,
      items: temp,
      owner: owner,
    };

    console.log(list_id);
    axios
      .post(`http://localhost:5000/wishlists/update/${list_id}`, wishlist)
      .then((res) => {
        console.log("yay wihslist edited!");
      })
      .catch((err) => console.log(err));
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

  console.log(editedItems);
  //console.log(editedTitle)
  return (
    <div className="wishlist-container">
      <Navbar />
      <div className="wishlist-page">
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
          <button className="add-btn" onClick={() => setEditing(false)}>
              Save
            </button>
          </div>
        ) : (
          <div className="item-line">
            <div className="list-header-text">{title}</div>
            <button className="add-btn" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        )}
        <div className="wishlists-container">
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
                style={{ marginTop: 40 }}
                className="wishlist-input"
                type="text"
                name="item"
                placeholder="New item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => handleNewItem(e)}
              />
              <button className="add-btn" onClick={() => addNewItem()}>
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
