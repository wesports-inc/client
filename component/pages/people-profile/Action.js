import React, { Component } from "react"
import { Container, Grid, Header, Divider, Image, Segment, Statistic, Button, Label, Icon } from "semantic-ui-react"
import axios from 'axios'

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('username'),
      profile: []
    };
  }

  componentWillMount() {
    axios({
        method: 'post',
        url: '/api/people/profile/get',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
          username: this.state.username, // This is the body part
        }
      }).then(result => this.setState({profile: result.data}));
  }
  
  
  render() {
    const {profile} = this.state

    return (
        <div>
            <Segment.Group horizontal style={{textAlign: "center"}}>
                <Segment>
                    <Icon name='compose' />
                </Segment>
                <Segment>
                    <Icon name='user' />
                </Segment>
                <Segment>
                    <Icon name='eye' />
                </Segment>
                <Segment>
                    <Icon name='trophy' />
                </Segment>
            </Segment.Group>
        </div>
        )
    }
}


