import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import "./WishlistPage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectedeventActions from "../reducers/SelectedeventReducer";
import { useNavigate, useLocation } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import birthdayImage from '../assets/birthday.png'

function EventsPage(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event_id } = state;
  const { event, selectedeventRequest } = props;
  const { wishlist, name, date, venue, guests } = event || {};
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${event_id}`, event_id)
      .then((res) => {
        console.log(res);
        selectedeventRequest(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (event && wishlist) {
      axios
        .get(`http://localhost:5000/wishlists/${wishlist}`, wishlist)
        .then((res) => {
          console.log(res);
          setItems(res.data.items);
        })
        .catch((err) => console.log(err));
    }
  }, [event]);

  console.log(event);

  const onGoBack = () => {
    navigate("/profile");
  };

  return (
    <div className="wishlist-container">
      <Navbar />
      <div className="wishlist-page">
        <button className="back-btn" onClick={() => onGoBack()}>
          <img className="back-image" src={backArrow} />
        </button>
        <div className="list-header-text" style={{ marginTop: 50 }}>
          {name}
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
          <div className="wishlist-items-container">
            <ul style={{ padding: 0 }}>
              {items &&
                items.map((item, index) => (
                  <div>
                    <div className="wishlist-item-element">{item}</div>
                    <hr />
                  </div>
                ))}
            </ul>
          </div>
          <div className="event-details-container">
            { event && (
            <ul className="event-details" style={{ padding: 0 }}>
              <li className="event-line">
                Date:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(date))}
              </li>
              <li className="event-line">Location: {venue}</li>
              <li className="event-line">Guests: </li>
              {guests.map((guest) => (
                <li className="event-line">{guest}</li>
              ))}
            </ul>
            )}
             <img className="category-image" src={birthdayImage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  event: state.selectedEvent.payload,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Object.assign(SelectedeventActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
