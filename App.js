import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Link to="/home">My Profile</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/test">Test Pages</Link>
      </div>
    );
  }
}
