import React, { Component } from "react";
import {Menu, Icon, Grid, GridColumn} from 'semantic-ui-react';

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenu: ''
    };
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {

  }

  handleMenu(category) {
      this.setState({
        isMenu: category
      }, () => console.log('handle menu: ', this.state.isMenu));
  }

  render() {
    const {isMenu} = this.state;
    if(isMenu === 'profile'){
      window.location = '#/profile'
    }
    return (
      <Menu fluid widths={5} style={{
        zIndex: 2,
        position: "fixed",
        bottom: 0
        }}>
        <Menu.Item name='home' active={isMenu === 'home'} onClick={ () => this.handleMenu('home')}>
          <Icon name='clock outline' size="large"/>
        </Menu.Item>

        <Menu.Item name='chat' active={isMenu === 'chat'} onClick={ () => this.handleMenu('chat')}>
          <Icon name='comment alternate outline' size="large"/>
        </Menu.Item>

        <Menu.Item name='post' active={isMenu === 'post'} onClick={ () => this.handleMenu('post')}>
          <Icon name='plus square outline' size="large"/>
        </Menu.Item>

        <Menu.Item name='Notification' active={isMenu === 'notification'} onClick={ () => this.handleMenu('notification')}>
          <Icon name='bell outline' size="large" />
        </Menu.Item>

        <Menu.Item name='profile' active={isMenu === 'profile'} onClick={ () => this.handleMenu('profile')}>
          <Icon name='user circle outline' size="large"/>
        </Menu.Item>
      </Menu>
    );
  }
}   