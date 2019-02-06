import React, { Component } from "react";
import { Menu, Button, Input, Icon } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMenu: "",
      menu: localStorage.getItem("menu"),
      datas: [],
      isLoading: true,
      email: localStorage.getItem("email").slice(1, -1),
      content: "",
      tags: "",
      options: [],
      value: "null",
      seen: null,
      tag: 0,
      post: 0
    };
    
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    if(this.state.email){
      this.setState({ isLoading: false });
    }
  }

  generateSkeleton() {
    return (
      <div>
        <Menu
          fluid
          widths={5}
          style={{
            zIndex: 2,
            position: "fixed",
            bottom: 0
          }}
        >
          <Menu.Item name="home">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }

    
  render () {
    return (
      <div>
        {this.state.isLoading ? (
          this.generateSkeleton()
        ) : (
            <Menu
              fluid
                widths={1}
                style={{
                zIndex: 2,
                position: "fixed",
                bottom: 0
              }}
            >
              <Menu.Item>
                <Input fluid icon='paper plane outline' placeholder='Ketik Pesan' />
              </Menu.Item>
            </Menu>
          )}
      </div>
    );
  }
}