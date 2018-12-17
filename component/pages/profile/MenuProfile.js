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

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const friendOptions = [
      {
        text: 'Pilih Kategori',
        value: 'null',
        image: { avatar: true, src: 'https://pamperthecamper.com/wp-content/uploads/2016/04/SEO-PamperTheCamper-icon-choose.png' },
      },
      {
        text: 'Komputer & Gadget',
        value: 'computer-gadget',
        image: { avatar: true, src: 'http://www.iconsweets2.com/assets/images/macbook@2x.png' },
      },
      {
        text: 'Keluarga & Asmara',
        value: 'family-love',
        image: { avatar: true, src: 'https://png.pngtree.com/element_our/md/20180626/md_5b321ca7a1ca4.png' },
      },
      {
        text: 'Fakta & Rumor',
        value: 'fact-rumour',
        image: { avatar: true, src: 'https://img.icons8.com/color/180/light-on.png' },
      },
      {
        text: 'Bisnis & Pekerjaan',
        value: 'business-work',
        image: { avatar: true, src: 'https://img.icons8.com/color/1600/hard-working.png' },
      },
      {
        text: 'Fashion & Gaya Hidup',
        value: 'fashion-lifestyle',
        image: { avatar: true, src: 'https://img.icons8.com/color/1600/fashion-trend.png' },
      },
      {
        text: 'Quotes',
        value: 'quotes',
        image: { avatar: true, src: 'https://png.pngtree.com/svg/20170608/quotes_727798.png' },
      },
      {
        text: 'Riddles',
        value: 'riddles',
        image: { avatar: true, src: 'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Adventure_Map-512.png' },
      },
      {
        text: 'Lainnya',
        value: 'other',
        image: { avatar: true, src: 'https://img.icons8.com/metro/1600/more.png' },
      },
    ]

    const { open, dimmer } = this.state
    const {isLoading} = this.state;
    const {isMenu} = this.state;
    const {menu} = this.state;
    const {datas} = this.state;
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
          {menu === 'notification' ? <Icon name='bell' size="large" /> : <Icon name='bell outline' size="large" />}
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
                    <TextArea autoHeight placeholder='What happen...' />
                  </Form>
                </Modal.Description>
              </Modal.Content>
              
              <Modal.Actions>
              <span style={{float: 'left'}}>
              <Dropdown inline options={friendOptions} defaultValue={friendOptions[0].value} />
              </span>
                <Button
                  primary
                  icon='checkmark'
                  labelPosition='right'
                  content="Yep, Publish!"
                  onClick={this.close}
                />
              </Modal.Actions>
            </Modal>
      </div>
    );
  }
}   