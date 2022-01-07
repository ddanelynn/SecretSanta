import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectedlistActions from "../reducers/SelectedlistReducer";
import { Navbar } from "./Navbar";
import "./WishlistPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import Editable from "./Editable";

function WishlistPage(props) {
  const { state } = useLocation();
  const { list_id } = state;
  const { selectedlistRequest, wishlist } = props;
  const { title, items, owner } = wishlist || {};

  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${list_id}`, list_id)
      .then((res) => {
        selectedlistRequest(res.data);
      })
      .catch((err) => console.log(err));
  }, [wishlist]);

  const editItem = () => {
    const wishlist = {
        title: title,
        items: items,
        owner: owner,
      };
    
    axios
    .post(`http://localhost:5000/wishlists/${list_id}`, wishlist)
    .then((res) => {
      console.log("yay wihslist added!");
    })
    .catch((err) => console.log(err));
  }

  return (
      <div className="wishlist-container">
        <Navbar />
        <div className="wishlist-page">
          {/* <div className="header-text">{title}</div> */}
          <Editable
            style={{ marginTop: 50, marginBottom: 20 }}
            text={title}
            placeholder="Title of Wishlist"
            type="input"
            defaultEditable={false}
            size="large"
            color="white"
          >
            <input
              className="wishlist-input"
              type="text"
              name="title"
              placeholder="Title of Wishlist"
              //onKeyDown={(e) => handleKeyDown(e)}
              value={title}
              //onChange={(e) => setTitle(e.target.value)}
            />
          </Editable>
          <div className="wishlists-container">
            <ul style={{ padding: 0 }}>
              {items &&
                items.map((item, index) => (
                  <div key={index} className="wishlist-item-element">
                      <div className="item-line">
                    <div>{item}</div>
                    <div>
                    <button className="edit-btn" style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faPen} color={'#adadac'}/>
                    </button>
                    <button className="edit-btn">
                    <FontAwesomeIcon icon={faTimes} color={'#adadac'}/>
                    </button>
                    </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </ul>
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
