import React, { Component } from "react";
import {Icon, Menu} from 'semantic-ui-react';

export default class HeaderMenu extends Component {

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
    }
    back() {
      window.location = "#/profile"
    }

    render () {
        return (
            <Menu borderless size="huge">
            <Menu.Item name='back'>
              <Icon onClick={this.back.bind(this)} name="arrow left"/>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='help'>
                <a onClick={this.logout.bind(this)}>Logout</a>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        );
    }


}
