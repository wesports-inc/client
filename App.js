import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "./component/pages/static/index.static";
import Headers from "./component/pages/home/header/index.header.home";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar />
        <Headers />
        <Footer />
      </div>
    );
  }
}
