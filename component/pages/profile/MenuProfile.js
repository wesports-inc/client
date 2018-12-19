import React, { Component } from "react";
import {Menu, Icon, Label, Modal, Header, Form,TextArea, Button, Dropdown} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios'

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        isMenu: '',
        menu: localStorage.getItem('menu'),
        datas: [],
        isLoading: true,
        email: localStorage.getItem('email').slice(1,-1),
        content: '',
        tags: '',
        options: [],
        value: '?',
    };
    this.handleMenu = this.handleMenu.bind(this)
    this.generateSkeleton = this.generateSkeleton.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleTags = this.handleTags.bind(this)
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

    axios({
      method: 'get',
      url: '/api/tags',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    }).then(result => this.setState({options: result.data}));

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

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
        [name]: value 
    })
    console.log('data berubah: ', value)
  }

  handleTags = (event) => {
    this.setState({ value: event.target.value });
  };

  publish() {
    event.preventDefault();
        var data = {
            email: this.state.email,
            content: this.state.content,
            tags: this.state.value
        }
        fetch('/api/posting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(console.log('sukses terkirim...'));
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    console.log('pilihan: ', this.state.value)
    const { open, dimmer } = this.state
    const {isLoading, isMenu, menu, datas, options, value} = this.state;
    if(isMenu === 'profile'){
      window.location = '#/profile'
    }else if(isMenu === 'notification'){
      window.location = '#/notification'
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

        <Menu.Item name='post' active={menu === 'post'} onClick={this.show('blurring')}>
          {menu === 'post' ? <Icon name='plus square' size="large"/> : <Icon name='plus square outline' size="large"/>}
        </Menu.Item>

        <Menu.Item name='Notification' active={menu === 'notification'} onClick={ () => this.handleMenu('notification')}>
          {datas.length === 0 ? '' :
          <Label circular size="tiny" floating color="red" key="red">
          {datas.length}
          </Label>
          }
          {menu === 'notification' ?   <Icon name='bell' size="large" /> : <Icon name='bell outline' size="large" />}
        </Menu.Item>

        <Menu.Item name='profile' active={menu === 'profile'} onClick={ () => this.handleMenu('profile')}>
          {menu === 'profile' ? <Icon name='user circle' size="large"/> : <Icon name='user circle outline' size="large"/>}
        </Menu.Item>
      </Menu>
      }
          <Modal dimmer={dimmer} size="large" open={open} onClose={this.close}>
              <Modal.Header>Post Your Activity <Icon name="share"></Icon></Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header as="h5">this will be great for your followers</Header>
                  <Form>
                    <TextArea name="content" onChange={this.handlePost} autoHeight placeholder='What happen...' />
                  </Form>
                </Modal.Description>
              </Modal.Content>
              
              <Modal.Actions>
                <span style={{float: "left"}}>
                <select onChange={this.handleTags} value={value}>
                  {options.map(item => (
                  <option key={item.value} value={item.value}>
                  {item.text}
                  </option>
                  ))}
                </select>
                </span>
                <Button
                  primary
                  icon='checkmark'
                  labelPosition='right'
                  content="Yep, Publish!"
                  onClick={this.publish.bind(this)}
                />
              </Modal.Actions>
            </Modal>
      </div>
    );
  }
}   