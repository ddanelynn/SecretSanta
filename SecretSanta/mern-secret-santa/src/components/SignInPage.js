import React from "react";
import './SignIn.css';

export const SignInPage = () => {
  return (
    <div className="first-page">
      <div className="signup-box">
        <div className="welcome-text">Welcome Back!</div>
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
              name="password"
              placeholder="Password"
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