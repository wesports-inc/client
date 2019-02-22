import React, { Component } from "react";
import {
  Menu
} from "semantic-ui-react";
import axios from "axios";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <Menu fixed="top" widths={1}>
          <Menu.Item>WAY</Menu.Item>
        </Menu>
      </div>
    );
  }
}
