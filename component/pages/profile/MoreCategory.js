import React, { Component } from "react";
import {Image, Container, Divider, Icon, Grid, GridColumn} from 'semantic-ui-react';
import settingIcon from '../../../assets/images/icon/setting.png';
import groupIcon from '../../../assets/images/icon/group.png';
import galleryIcon from '../../../assets/images/icon/gallery.png';
import statisticIcon from '../../../assets/images/icon/Statistic.png';

export default class MoreCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isCategory: ''
    };
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu(category) {
      this.setState({
        isCategory: category
      }, () => console.log('handle more category: ', this.state.isCategory));
  }

  noSpacing = {
    textAlign: "center",
    margin:0,
    padding:0
  }

  smallFontCenter = {
    fontSize: 10, 
    textAlign: "center"
  }

  render() {
    // bypass logout user
    if(this.state.isCategory === 'setting'){
        window.location='#/login';
    }else{
        console.log('will mounting...');
    }
    return (
        <Container>
            <Divider hidden />
            <Grid columns={4}>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('statistic')}><Image src={statisticIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Statistic</p>
                </GridColumn>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('gallery')}><Image src={galleryIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Gallery</p>
                </GridColumn>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('group')}><Image src={groupIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Group</p>
                </GridColumn>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('setting')}><Image src={settingIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Setting</p>
                </GridColumn>
            </Grid>
        </Container>
    );
  }
}   