import React, { useState } from 'react'
import './SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//TODO: ensure unique username and fields are all filled in
export const SignUpPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        if (confirmPassword !== password) {
          alert('Please ensure that the passwords entered are the same.')
          setLoading(false)
          return null
        }

        const user = {
          username: username,
          email: email,
          password: password,
        }
    
        axios.post('http://localhost:5000/users/add', user)
          .then(res => { 
            setSuccess(true)
            localStorage.setItem('login', true)
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
              className="first-input"
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="first-input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="first-input"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="first-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
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
