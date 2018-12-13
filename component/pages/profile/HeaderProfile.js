import React, { Component } from "react";
// import Logo from "../../../assets/images/logo/apple-logo.png";
// import { Link } from "react-router-dom";
import Background from '../../../assets/images/background/bg-profile.jpg';

import {Grid, Container, Segment, Divider, Image, Icon, GridColumn, List, Menu} from 'semantic-ui-react';

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  componentWillMount() {
    const email = localStorage.getItem('email').slice(1, -1)
    this.setState({
      email
    })
  }

  componentDidMount() {

  }
  render() {
    const { isLoading } = this.state;
    const smallFont = {
      fontSize: 10
    }
    const toRight = {
      float: "right"
    }
    return ( 
      <Container>
      <Grid columns={2} style={{backgroundImage: `url(${Background})`}}>
      <Divider hidden />
        <Grid.Row stretched>
          <Grid.Column>
              <Image src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png' />
              <p style={{textAlign: "center", marginTop: 15, color: "white"}}>{this.state.email}</p>
          </Grid.Column>
          <Grid.Column style={{opacity: 0.9}}>
            <Segment>
              <p style={{textAlign: "center"}}><span><Icon name='chess queen' size="large" color='red' /><Icon name='chess queen' size="large" color='red' /></span></p>
              <Divider />
              <p style={smallFont}>Posts <span style={toRight}>1,522</span></p>
              <p style={smallFont}>Thanks <span style={toRight}>886</span></p>
              <p style={smallFont}>Friends <span style={toRight}><u style={{color: "blue"}}>314</u></span></p>
              <p style={smallFont}>Awards <span style={toRight}><u style={{color: "blue"}}>2</u></span></p>
              <p style={smallFont}>Join Date <span style={toRight}><i>Aug 2012</i></span></p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
    );
  }
}
