import React, { Component } from "react";
import Skeleton from 'react-skeleton-loader';
import {Grid, Container, Segment, Divider, Image, Icon, Header} from 'semantic-ui-react';

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
      followed_topic: 'other',
      time: new Date(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      coloring: ''
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
    }).then(result => this.setState({username: result.data.username, first_name: result.data.first_name, last_name: result.data.last_name, awards: result.data.awards, total_friends: result.data.total_friends, total_posts: result.data.total_posts, total_thanks: result.data.total_thanks,join_date: result.data.join_date, followed_topic: result.data.tags})))

    if(hour > 5 && hour < 10 ) {
      this.setState({background: 'http://hdbackgroundspic.com/wp-content/uploads/2017/04/beautiful-view-good-morning.jpg', coloring: '#625D5D'})
    }else if(hour > 9 && hour < 15){
      this.setState({background: 'https://c1.staticflickr.com/6/5010/5344146801_e8e2cea999_b.jpg', coloring: '#3D3C3A'})
    }else if(hour > 14 && hour < 18){
      this.setState({background: 'https://www.desktop-background.com/p/2014/02/13/716536_1024x1024-beautiful-beach-sunset-wallpapers_1024x1024_h.jpg', coloring: '#f0f0f0'})
    }else {
      this.setState({background: 'http://www.tabletwallpapers.org/download/stars-and-snow-night-in-the-alps-wallpaper_1024x1024.jpg', coloring: 'white'})
    }

    if(total_posts == 0){
      this.setState({img_posts: ''})
    }else if (total_posts == 1 || total_posts < 10){
      this.setState({img_posts: ''})
    }else if (total_posts == 11 || total_posts > 50){
      this.setState({img_posts: ''})
    }

    
    if(total_thanks == 0){
      this.setState({img_thanks: ''})
    }else if (total_thanks == 1 || total_thanks < 10){
      this.setState({img_thanks: ''})
    }else if (total_thanks == 11 || total_thanks > 50){
      this.setState({img_thanks: ''})
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);
  }

  post() {
    event.preventDefault();
    localStorage.setItem('tag', JSON.stringify(this.state.followed_topic))
    window.location='#/TagsPost/'+this.state.followed_topic     
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
    const {background, username, first_name, last_name, awards, total_friends, total_posts, total_thanks, join_date, followed_topic} = this.state;
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
      <Grid columns={2} style={{backgroundImage: `url(${background})`}}>
      <Divider hidden />
        <Grid.Row>
          <Grid.Column>
            <Segment basic textAlign="center">
              <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' size="medium" circular bordered />
              <Header as='p' style={{marginTop: 0, color: this.state.coloring}}>
              @{username}
              <br/>
              <small><i>{first_name} {last_name}</i></small>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column style={{opacity: 0.8}}>
            <Segment raised>
              <p style={smallFont}>Posts <span style={toRight}>{total_posts}</span></p>
              <p style={smallFont}>Thanks <span style={toRight}>{total_thanks}</span></p>
              <p style={smallFont}>Friends <span style={toRight}><u style={{color: "blue"}}>{total_friends}</u></span></p>
              <p style={smallFont}>Awards <span style={toRight}><u style={{color: "blue"}}>{awards}</u></span></p>
              <p style={smallFont}>Tags <span style={toRight}><a onClick={this.post.bind(this)}>{followed_topic}</a></span></p>
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
