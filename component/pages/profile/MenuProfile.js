import React, { Component } from "react";
import {Menu, Icon, Grid, GridColumn} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenu: '',
        isLoading: true
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentDidMount() {
      setTimeout(() => {
          this.setState({isLoading: false})
      }, 400);
  }

  handleMenu(category) {
      this.setState({
        isMenu: category
      }, () => console.log('handle menu: ', this.state.isMenu));
  }

  generateSkeleton() {
    return (
      <div>
      <Menu fluid widths={5} style={{
        zIndex: 2,
        position: "fixed",
        bottom: 0
        }}>
        <Menu.Item name='home'>
        <Skeleton width="30px" borderRadius="100%" height="30px" />
        </Menu.Item>

        <Menu.Item name='chat'>
        <Skeleton width="30px" borderRadius="100%" height="30px" />
        </Menu.Item>

        <Menu.Item name='post'>
        <Skeleton width="30px" borderRadius="100%" height="30px" />
        </Menu.Item>

        <Menu.Item name='Notification'>
        <Skeleton width="30px" borderRadius="100%" height="30px" />
        </Menu.Item>

        <Menu.Item name='profile'>
        <Skeleton width="30px" borderRadius="100%" height="30px" />
        </Menu.Item>
      </Menu>
      </div>
    );
  }

  render() {
    const {isLoading} = this.state;
    const {isMenu} = this.state;
    if(isMenu === 'profile'){
      window.location = '#/profile'
    }else if(isMenu === 'notification'){
      window.location = '#/notification'
    }else if(isMenu === 'chat'){
      window.location = '#/messages'
    }else if(isMenu === 'home'){
      window.location = '#/home'
    }else{
    }
    return (
      <div>
      {isLoading ? this.generateSkeleton() :
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
      }
      </div>
    );
  }
}   