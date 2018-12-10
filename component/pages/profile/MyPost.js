import React, { Component } from "react";
import {Grid, Container, Segment, Divider, Image, Icon, GridColumn, List, Menu} from 'semantic-ui-react';

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
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
        ); 
    }
}