import React, { Component } from "react";
import { Navbar, Footer } from "./component/pages/static/index.static";
import Headers from "./component/pages/home/header/index.header.home";
import Available from "./component/pages/home/available/index.available.home";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ marginBottom: 40 }}>
          <Headers />
        </div>
        <div style={{ marginTop: 40, background: "#f7f7f7" }}>
          <Available />
        </div>
        <Footer />
      </div>
    );
  }
}
