import React, { Component } from "react"
import { Container, Segment, Icon, List, Grid, GridColumn, Divider} from 'semantic-ui-react'
import Skeleton from 'react-skeleton-loader';
import axios from 'axios'
import MyPost from "../profile/MyPost";

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            isLoading: true,
            time: new Date(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            tags: ['?'],
            nilai: [],
          };
          this.view = this.view.bind(this)
          this.generateSkeleton = this.generateSkeleton.bind(this)
        }
    
      componentDidMount(){
        setTimeout(() => {
          this.setState({isLoading: false})
        }, 500);
    
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
          
        }).then(result => this.setState({tags: result.data.tags})))
    }

    handleChange() {
        console.log('oke')
    }   
    view(e, data) {
        this.setState({
            nilai: data.isi
        })
        console.log('data : ', nilai)
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

    render () {
         const tags = this.state.tags;
         var element = tags.join();
         const newArray = element.split(',');
         var judul = newArray.values();
        var isi = [];
        return (
        <div>      
            {newArray.map(data => { 
                isi.push(data)
               console.log(isi)
        return (    
            <Grid style={{display: 'block', margin: '0px'}} columns={1} key={data}>
            <Segment.Group >
                <Segment>
                    <h3> {judul.next().value}
                    <Icon style={{float: 'right'}} onClick={this.view.bind(this)} name="angle right"/>
                    </h3>
                </Segment>
                <Segment>
                    <List.Item style={{float: 'block'}}><MyPost/></List.Item>

                </Segment>
            </Segment.Group>
            </Grid>
            ); })}
            <Divider hidden></Divider>
            <Divider hidden></Divider>
            <Divider hidden></Divider>
        </div>
        );
    }

}