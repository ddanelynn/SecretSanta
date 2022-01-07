import { faBell, faCalendar, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import React from 'react'

export const Navbar = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile')
    }

    const goToEvents = () => {
        navigate('/')
    }

    const goToFeed = () => {
        navigate('/')
    }

    return (
        <div className="nav-bar">
            <div className="app-name">
            SugarDaddy
            </div>
            <div>
                <button className="nav-icons" onClick={() => goToFeed()}>
                <FontAwesomeIcon icon={faHome} color='white' size="lg" style={{ marginRight: 10 }}/>
                Feed
                </button>
                <button className="nav-icons" onClick={() => goToProfile()}>
                <FontAwesomeIcon icon={faUser} color='white' size="lg" style={{ marginRight: 10 }}/>
                Profile
                </button>
                <button className="nav-icons" onClick={() => goToEvents()}>
                <FontAwesomeIcon icon={faCalendar} color='white' size="lg" style={{ marginRight: 10 }}/>
                Events
                </button>
                <button className="nav-icons">
                <FontAwesomeIcon icon={faBell} color='white' size="lg" style={{ marginRight: 10 }}/>
                </button>
            </div>
        </div>
    )
}
