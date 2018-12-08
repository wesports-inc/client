import React, { Component } from "react";
import "./Welcomes.css";
import Logo from "../../../assets/images/logo/apple-logo.png";
import { Link } from "react-router-dom";

export default class Welcomes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: "hafidh"
    };
  }
  componentDidMount() {
    const { isClicked } = this.state;
    console.log("user yang membuka page  ini adalah: ", isClicked);
  }
  render() {
    return (
      <div className="page">
        <div className="container">
          <h1 className="header_welcome">Chat Different Way</h1>
          <div className="wrapper">
            <div className="square-content">
              <img src={Logo} />
            </div>
            <hr />
            <div className="introduce-content">
              <p>Jadilah influencer terbaik se-Indonesia</p>
            </div>
          </div>
        </div>
        <div className="footer-content">
          <Link to="/" className="dot-footer">
            masuk akun
          </Link>
        </div>
      </div>
    );
  }
}
