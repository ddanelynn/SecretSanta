import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectedlistActions from "../reducers/SelectedlistReducer";
import { Navbar } from "./Navbar";
import "./WishlistPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPenAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function WishlistPage(props) {
  const { state } = useLocation();
  const { list_id } = state;
  const { selectedlistRequest, wishlist } = props;
  const { title, items } = wishlist || {};

  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${list_id}`, list_id)
      .then((res) => {
        selectedlistRequest(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
      <div className="wishlist-container">
        <Navbar />
        <div className="wishlist-page">
          <div className="header-text">{title}</div>
          <div className="wishlists-container">
            <ul style={{ padding: 0 }}>
              {items &&
                items.map((item, index) => (
                  <div key={index} className="wishlist-item">
                      <div className="item-line">
                    <div>{item}</div>
                    <button className="edit-btn">
                    <FontAwesomeIcon icon={faPen} color={'#adadac'}/>
                    </button>
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
