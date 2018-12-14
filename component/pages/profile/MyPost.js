import React, { Component } from "react";
import {Grid, Container, Segment, Divider, Image, Icon, GridColumn, List, Menu} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);
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
    const { isLoading } = this.state;
    return (
      <div>
      {isLoading ? this.generateSkeleton() :
      <Container>
        <Grid>
        <GridColumn>
          <Segment basic>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Icon name='film' color="black" /></List.Header>
                  <List.Description>
                    Last seen watching{' '}
                    <a>
                      <b>Mr Robot Season 3 - Episode 6</b>
                    </a>{' '}
                    <small><i>just now</i></small>.
                  </List.Description>
                </List.Content>
              </List.Item>
              <Divider clearing/>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Icon name='book' color="black"/></List.Header>
                  <List.Description>
                    Last seen reading{' '}
                    <a>
                      <b>Si Boy Anak Betawi Asli - by Rojali Rahmat</b>
                    </a>{' '}
                    <small><i>3 hours ago</i></small>.
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </GridColumn>
      </Grid>
      </Container>
      }
      </div>
        ); 
    }
}