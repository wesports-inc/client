import React, { Component } from "react";
import {Menu, Icon, Label} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios'

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenu: '',
        menu: localStorage.getItem('menu'),
        datas: [],
        isLoading: true,
        email: localStorage.getItem('email').slice(1,-1)
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentWillMount() {
    axios({
      method: 'post',
      url: '/api/friend/notif',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      data: {
        email: this.state.email, // This is the body part
      }
    }).then(result => this.setState({datas: result.data}));
  }

  componentDidMount() {
      setTimeout(() => {
          this.setState({isLoading: false})
      }, 400);
  }

  handleMenu(category) {
      this.setState({
        isMenu: category
      }, () => localStorage.setItem('menu', this.state.isMenu));
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
        <Skeleton width="20px" borderRadius="100%" height="20px" />
        </Menu.Item>

        <Menu.Item name='chat'>
        <Skeleton width="20px" borderRadius="100%" height="20px" />
        </Menu.Item>

        <Menu.Item name='post'>
        <Skeleton width="20px" borderRadius="100%" height="20px" />
        </Menu.Item>

        <Menu.Item name='Notification'>
        <Skeleton width="20px" borderRadius="100%" height="20px" />
        </Menu.Item>

        <Menu.Item name='profile'>
        <Skeleton width="20px" borderRadius="100%" height="20px" />
        </Menu.Item>
      </Menu>
      </div>
    );
  }

  render() {
    console.log('data: ', this.state.datas)
    const {isLoading} = this.state;
    const {isMenu} = this.state;
    const {menu} = this.state;
    const {datas} = this.state;
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
        <Menu.Item name='home' active={menu === 'home'} onClick={ () => this.handleMenu('home')}>
          {menu === 'home' ? <Icon name='clock' size="large"/> : <Icon name='clock outline' size="large"/> }
        </Menu.Item>

        <Menu.Item name='chat' active={menu === 'chat'} onClick={ () => this.handleMenu('chat')}>
          {menu === 'chat' ? <Icon name='comment alternate' size="large"/> : <Icon name='comment alternate outline' size="large"/>}
        </Menu.Item>

        <Menu.Item name='post' active={menu === 'post'} onClick={ () => this.handleMenu('post')}>
          {menu === 'post' ? <Icon name='plus square' size="large"/> : <Icon name='plus square outline' size="large"/>}
        </Menu.Item>

        <Menu.Item name='Notification' active={menu === 'notification'} onClick={ () => this.handleMenu('notification')}>
          <Label circular size="tiny" floating color="red" key="red">
          {datas.length}
          </Label>
          {menu === 'notification' ? <Icon name='bell' size="large" /> : <Icon name='bell outline' size="large" />}
        </Menu.Item>

        <Menu.Item name='profile' active={menu === 'profile'} onClick={ () => this.handleMenu('profile')}>
          {menu === 'profile' ? <Icon name='user circle' size="large"/> : <Icon name='user circle outline' size="large"/>}
        </Menu.Item>
      </Menu>
      }
      </div>
    );
  }
}   