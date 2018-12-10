import React, { Component } from "react";
import {Menu, Icon, Grid, GridColumn} from 'semantic-ui-react';

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenu: null
    };
    this.handleMenu = this.handleMenu.bind(this);
  }
  handleMenu(category) {
      this.setState({
        isMenu: category
      }, () => console.log('handle menu: ', this.state.isMenu));
  }

  render() {
    const {isMenu} = this.state;
    return (
        <Grid columns={1} style={{
            position: "fixed",
            bottom: 0
            }}>
            <GridColumn>
        <Menu fluid style={{margin: 0, padding: 0}}>
        <Menu.Item name='home' active={isMenu === 'home'} onClick={ () => this.handleMenu('home')}>
          <Icon name='clock outline' size="large"/>
        </Menu.Item>

        <Menu.Item name='search' active={isMenu === 'search'} onClick={ () => this.handleMenu('search')}>
          <Icon name='comment alternate outline' size="large"/>
        </Menu.Item>

        <Menu.Item name='post' active={isMenu === 'post'} onClick={ () => this.handleMenu('post')}>
          <Icon name='plus square outline' size="large"/>
        </Menu.Item>

        <Menu.Item name='Notification' active={isMenu === 'notification'} onClick={ () => this.handleMenu('notification')}>
          <Icon name='bell outline' size="large" />
        </Menu.Item>

        <Menu.Item name='setting' active={isMenu === 'setting'} onClick={ () => this.handleMenu('setting')}>
          <Icon name='sun outline' size="large"/>
        </Menu.Item>
      </Menu>
      </GridColumn>
      </Grid>
    );
  }
}   