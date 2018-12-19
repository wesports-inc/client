import React, { Component } from "react";
import "./Formlogin.css";

export default class Test extends Component {
  render() {
    return(
      <body>
        <div className="login">
          <div className="login-header">
            <h1>Sign In</h1>
          </div>
          <div className="login-form">
            <input type="text" placeholder="Username" />
            <br />
            <input type="password" placeholder="Password" />
            <button className="login-button">Log In</button>
            <br />
            <h6 className="no-access">Forgot Password?</h6>
            
            
          </div>
          <br />
            <a className="sign-up">Sign Up!</a>
        </div>
        

      </body>
      
      
      
    );
    
    
      }
}
