import React, { Component } from "react";
import {Icon, Menu, Header, Dropdown} from 'semantic-ui-react';

export default class HeaderPhoto extends Component {

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
    const tagOptions = [
      {
      text: 'Most Thanked',
      value: 'most-thanked',
      label: { color: 'red', empty: true, circular: true },
      },
      {
        text: 'Upload Date',
        value: 'upload-date',
        label: { color: 'blue', empty: true, circular: true },
        },
    ]
        return (
            <Menu borderless size="huge" fixed="top">
            <Menu.Item name='back'>
              <Icon onClick={this.back.bind(this)} name="arrow left"/>
            </Menu.Item>
            <Menu.Menu position='right'>
            <Dropdown icon="ellipsis vertical" labeled floating style={{padding:15}}>
              <Dropdown.Menu>
              <Dropdown.Header icon='filter' content='Filter By' />
                <Dropdown.Menu direction="left" scrolling>
                {tagOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
            </Menu.Menu>
          </Menu>
        );
    }
}
