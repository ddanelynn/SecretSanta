import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';

export const SignInPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [authFail, setAuthFail] = useState(false)
    const navigate = useNavigate();

    const onSubmit = (e) => {
      e.preventDefault();
  
      const user = {
        username: username,
        password: password,
      }
  
      axios.post('http://localhost:5000/users/authenticate', user)
        .then(res => { navigate('/home') })
        .catch((err) => setAuthFail(true));
  
    }

    const inputUsername = (username) => {
      setAuthFail(false)
      setUsername(username)
    }

    const inputPassword = (password) => {
      setAuthFail(false)
      setPassword(password)
    }
    

  return (
    <div className="first-page">
      <div className="signup-box">
        <div className="welcome-text">Welcome Back!</div>
        { authFail && <div className="fail-text">Incorrect email or password!</div> }
        <form onSubmit={onSubmit}>
          <div className="form">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => inputUsername(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="password"
              placeholder="Password"
              onChange={(e) => inputPassword(e.target.value)}
            />
          </div>
          <div className="signup-text">
            Don't have an account? Sign up <a href={"/sign-up"}>here</a>!
          </div>
          <input className="login-button" type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
};
export default SignInPage;