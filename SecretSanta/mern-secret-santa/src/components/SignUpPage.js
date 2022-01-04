import React, { useState } from 'react'
import './SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
    
        const user = {
          username: username,
          email: email,
          password: password,
        }
    
        console.log(user);
    
        axios.post('http://localhost:5000/users/add', user)
          .then(res => { 
            setSuccess(true)
          });
    
      }

      const navigate = useNavigate();
      const goToSignIn = () => {
        navigate('/')
      }

    return (
        <div className="first-page">
      <div className="signup-box">
        {!success ? (
          <>
        <div className="welcome-text">Welcome!</div>
        <form onSubmit={onSubmit}>
          <div className="form">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <input className="signup-button" type="submit" value={loading ? "Loading..." : "Sign Up"}  />
        </form>
        </>
        ) : (
          <>
          <div className="welcome-text">Account Created!</div>
          <button className="signup-button" onClick={goToSignIn}>Login to continue</button>
          </>
        )}
      </div>
    </div>
    )
}
