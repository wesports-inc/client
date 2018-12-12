import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLogin: false
    }
  }

  componentWillMount() {
    const {isLogin} = this.state;
    isLogin === true ? window.location = '#/profile' : window.location = '#/login'; 
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to="/profile">My Profile</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/test">Test Pages</Link>
      </div>
    );
  }
}
