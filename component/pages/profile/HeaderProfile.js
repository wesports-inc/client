import React, { Component } from "react";
import Skeleton from 'react-skeleton-loader';
import {Grid, Container, Segment, Divider, Image, Icon} from 'semantic-ui-react';

import axios from 'axios'

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isLoading: true,
      username: '',
      first_name: '',
      last_name: '',
      awards: 0,
      total_friends: 0,
      total_posts: 0,
      total_thanks: 0,
      join_date: '',
      background: '',
      img_posts: '',
      img_thanks: '',
      time: new Date(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes()
    };
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentWillMount() {
    const { hour } = this.state
    const {total_posts} = this.state
    const {total_thanks} = this.state

    const email = localStorage.getItem('email').slice(1, -1)
    this.setState({
      email
    }, () => 
    axios({
      method: 'post',
      url: '/api/profile',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      data: {
        email: this.state.email, // This is the body part
      }
    }).then(result => this.setState({username: result.data.username, first_name: result.data.first_name, last_name: result.data.last_name, awards: result.data.awards, total_friends: result.data.total_friends, total_posts: result.data.total_posts, total_thanks: result.data.total_thanks,join_date: result.data.join_date})))

    if(hour > 5 && hour < 10 ) {
      this.setState({background: '#ecdb3c'})
    }else if(hour > 9 && hour < 15){
      this.setState({background: '#4682b4'})
    }else if(hour > 14 && hour < 19){
      this.setState({background: '#e1ad46'})
    }else {
      this.setState({background: '#555555'})
    }

    if(total_posts == 0){
      this.setState({img_posts: 'https://cdn0.iconfinder.com/data/icons/positive-character-traits-alphabet-m/302/positive-M010-512.png'})
    }else if (total_posts == 1 || total_posts < 10){
      this.setState({img_posts: 'https://i.imgur.com/WIsfLo1.png'})
    }else if (total_posts == 11 || total_posts > 50){
      this.setState({img_posts: 'https://cdn0.iconfinder.com/data/icons/positive-character-traits-alphabet-r/264/positive-r013-512.png'})
    }

    
    if(total_thanks == 0){
      this.setState({img_thanks: 'http://badugukadhae.com/images/drawable/sad3.png'})
    }else if (total_thanks == 1 || total_thanks < 10){
      this.setState({img_thanks: 'https://cdn0.iconfinder.com/data/icons/type-of-government/257/ruler-politic-citizen-010-512.png'})
    }else if (total_thanks == 11 || total_thanks > 50){
      this.setState({img_thanks: 'https://cdn0.iconfinder.com/data/icons/positive-character-traits-alphabet-l-part-1/273/positive-L003-512.png'})
    }
  }

  componentDidMount() {
    console.log('did mount')

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);
  }
  
  generateSkeleton() {
    return <div>
      <Container>
      <Grid columns={2}>
      <Divider hidden />
        <Grid.Row stretched>
          <Grid.Column>
              <Skeleton borderRadius="100%" height="75px" />
              <Divider hidden />
              <Skeleton />
          </Grid.Column>
          <Grid.Column>
            <Skeleton height="150px"/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
      </Container>
      </div>
  }

  render() {
    console.log('render')
    const {username, first_name, last_name, awards, total_friends, total_posts, total_thanks, join_date} = this.state;
    const { isLoading } = this.state;

    //set user data caching
    localStorage.setItem('username', username)
    localStorage.setItem('first_name', first_name)
    localStorage.setItem('last_name', last_name)

    //simple css styling
    const smallFont = {
      fontSize: 10
    }
    const toRight = {
      float: "right"
    }

    return (
      <div>
      {isLoading ? this.generateSkeleton() :
      <Container>
      <Grid columns={2} style={{background: this.state.background}}>
      <Divider hidden />
        <Grid.Row stretched>
          <Grid.Column>
              <Image src='https://artsy-media-uploads.s3.amazonaws.com/2P6t_Yt6dF0TNN76dlp-_Q%2F3417757448_4a6bdf36ce_o.jpg' circular/>
              <p style={{textAlign: "center", marginTop: 15, color: "white"}}>@{username}<br/>{first_name} {last_name}</p>
          </Grid.Column>
          <Grid.Column style={{opacity: 0.9}}>
            <Segment>
            <Grid.Row stretched>
            <Grid.Column>
            <Image.Group>
              <Image centered src={ this.state.img_posts} height= "auto" width="50px" circular/>
              <Image centered src={ this.state.img_thanks} height= "auto" width="50px" circular/>
            </Image.Group> 
            </Grid.Column>
          </Grid.Row>
              <Divider />
              <p style={smallFont}>Posts <span style={toRight}>{total_posts}</span></p>
              <p style={smallFont}>Thanks <span style={toRight}>{total_thanks}</span></p>
              <p style={smallFont}>Friends <span style={toRight}><u style={{color: "blue"}}>{total_friends}</u></span></p>
              <p style={smallFont}>Awards <span style={toRight}><u style={{color: "blue"}}>{awards}</u></span></p>
              <p style={smallFont}>Join Date <span style={toRight}><i>{join_date}</i></span></p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
      }
      </div>
    );
  }
}
