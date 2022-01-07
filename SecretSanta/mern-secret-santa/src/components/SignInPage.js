import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './SignIn.css';
import axios from 'axios';
import UserActions from '../reducers/UserReducer'


// TODO: validation of password
export const SignInPage = (props) => {
    const { userRequest } = props
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
        .then((res) => { 
          console.log(res.data)
          localStorage.setItem('login', true)
          navigate('/profile')
          userRequest(res.data)
        })
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
        { authFail && <div className="fail-text">Incorrect username or password!</div> }
        <form onSubmit={onSubmit}>
          <div className="form">
            <input
              className="first-input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => inputUsername(e.target.value)}
            />
            <input
              className="first-input"
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Object.assign(UserActions), dispatch);

export default connect(null, mapDispatchToProps)(SignInPage);