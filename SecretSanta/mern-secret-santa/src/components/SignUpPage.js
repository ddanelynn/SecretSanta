import React from 'react'
import './SignIn.css';

export const SignUpPage = () => {
    return (
        <div className="first-page">
      <div className="signup-box">
        <div className="welcome-text">Welcome!</div>
        <form>
          <div className="form">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              className="input"
              type="text"
              name="password"
              placeholder="Password"
            />
            <input
              className="input"
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <input className="signup-button" type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
    )
}
