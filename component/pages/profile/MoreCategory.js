import React, { Component } from "react";
import {Image, Container, Divider, Grid, GridColumn, Segment} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';

export default class MoreCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isCategory: '',
        isLoading: true
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount(){
    setTimeout(() => {
        this.setState({isLoading: false})
      }, 500);
  }

  handleMenu(category) {
      this.setState({
        isCategory: category
      });
  }

  generateSkeleton() {
   
    return <div>
    <Container>
        <Divider hidden />
        <Grid columns={4}>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
        </Grid>
    </Container>
    </div>
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
    const settingIcon= 'http://192.168.100.200/assets/icons/more-categories/setting.png';
    const peopleIcon= 'http://192.168.100.200/assets/icons/more-categories/people.png';
    const photoIcon= 'http://192.168.100.200/assets/icons/more-categories/photo.png';
    const statisticIcon= 'http://192.168.100.200/assets/icons/more-categories/statistic.png';

    const { isLoading } = this.state;
    // bypass logout user
    if(this.state.isCategory === 'setting'){
        window.location='#/setting'
    }else if(this.state.isCategory === 'people'){
        window.location='#/people'
    }else if(this.state.isCategory === 'reputation'){
        window.location = '#/reputation'
    }else if(this.state.isCategory === 'statistic'){
        window.location = '#/statistic'
    }
    return (
        <div style={{marginBottom: 10}}>
            {isLoading ? this.generateSkeleton() :
        <Container>
            <Divider hidden />
            <Grid columns={4}>
                    <GridColumn>
                        <p style={this.noSpacing} onClick={() => this.handleMenu('statistic')}><Image src={statisticIcon} avatar /></p>
                        <p style={this.smallFontCenter}>Statistic</p>
                    </GridColumn>
                    <GridColumn>
                        <p style={this.noSpacing} onClick={() => this.handleMenu('reputation')}><Image src={photoIcon} avatar /></p>
                        <p style={this.smallFontCenter}>reputation</p>
                    </GridColumn>
                    <GridColumn>
                        <p style={this.noSpacing} onClick={() => this.handleMenu('people')}><Image src={peopleIcon} avatar /></p>
                        <p style={this.smallFontCenter}>People</p>
                    </GridColumn>
                    <GridColumn>
                        <p style={this.noSpacing} onClick={() => this.handleMenu('setting')}><Image src={settingIcon} avatar /></p>
                        <p style={this.smallFontCenter}>Setting</p>
                    </GridColumn>
            </Grid>
        </Container>
            }
        </div>
    );
  }
}   