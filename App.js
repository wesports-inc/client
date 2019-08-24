import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "./component/pages/static/index.static";
import Headers from "./component/pages/home/header/index.header.home";
import HeaderPlayer from "./component/pages/home/header_player/index.header_player.home";
import { Divider } from "semantic-ui-react";
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
        <div>
          <HeaderPlayer />
        </div>
        <Footer />
      </div>
    );
  }
}
