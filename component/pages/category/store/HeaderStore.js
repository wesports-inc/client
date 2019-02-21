import React, { Component } from "react";
import {Icon, Menu, Header} from 'semantic-ui-react';

export default class HeaderStore extends Component {

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
    }
    back() {
      window.location = "#/profile"
      localStorage.setItem('menu', 'profile');
    }

    render () {
        return (
            <Menu borderless size="huge">
            <Menu.Item name='back'>
              <Icon onClick={this.back.bind(this)} name="arrow left"/>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='help'>
                <Header as="h5">Store</Header>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        );
    }
}
