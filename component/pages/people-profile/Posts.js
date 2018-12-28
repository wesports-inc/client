import React, { Component } from "react";
import {Grid, Container, Segment, Divider, Icon, GridColumn, List, Dimmer, Header} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios'

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: sessionStorage.getItem('username'),
      posting : [],
      tgl : new Date().toDateString(),
      day : new Date().getDay(),
      jam : new Date().getHours(),
      menit : new Date().getMinutes(),
      menitPosting: [],
      waktu : []
    };
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }
  
  componentDidMount(){
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);

    axios({
      method: 'post',
      url: '/api/posting/people',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      data: {
        username: this.state.username, // This is the body part
      }
    }).then(result => this.setState({posting: result.data}));
  }

  generateSkeleton() {
    return (
      <div>
      <Container>
        <Grid>
        <GridColumn>
          <Segment basic>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Skeleton width="10px" height="10px" /></List.Header>
                  <List.Description>
                  <Skeleton />
                    <a>
                      <b><Skeleton /></b>
                    </a>{' '}
                    <small><i><Skeleton /></i></small>.
                  </List.Description>
                </List.Content>
              </List.Item>
              <Divider clearing/>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Skeleton width="10px" height="10px" /></List.Header>
                  <List.Description>
                  <Skeleton />
                    <a>
                      <b><Skeleton /></b>
                    </a>{' '}
                    <small><i><Skeleton /></i></small>.
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </GridColumn>
      </Grid>
      </Container>
      </div>
        ); 
  }

  render() {
    const {posting} = this.state
    const nopost = posting.length
    const { isLoading } = this.state
    let a;
    return (
      <div>
      {isLoading ? this.generateSkeleton() :
      nopost == 0 ?
        <Container>
            <Divider hidden/>
            <Header as='h2' icon textAlign="center">
                <Icon name='meh' />
                No Post
                <Header.Subheader><i>This user has no post yet, comeback later</i></Header.Subheader>
            </Header>
        </Container>
      :
      <Container>
        {posting.map(data => { 
        return (
        <Grid columns={1} key={data._id}>
        <GridColumn>
          <Segment basic>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Icon name='film' color="black" /><small><i>{' '}{data.tags}</i></small></List.Header>
                  <br />
                  <List.Description>
                    <a>
                      <b>{data.content}</b><br /><br />
                    </a>
                    <Icon name='like' color="red" /><small><i>{data.thanks}{' '}Thanks{' '}</i></small>
                    <small style={{float: "right"}}><i>{data.jam}{' '}{data.menit}{' '}{data.date}</i></small>
                    <Divider hidden>
                    </Divider>
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </GridColumn>
      </Grid>
      ); })}
      </Container>
      }
      </div>
        ); 
    }
}