import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Statistic, Label } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            datas: [],
            isLogin: '',
            friend_email: '',
            friend_status: '',
            friend_status_email: '',
            isLoading: true,
            friend_send: {}
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
        this.generateZeroData = this.generateZeroData.bind(this)
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/friend/status/confirm',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.email, // This is the body part
            }
          }).then(result => this.setState({datas: result.data}));

        this.setState({
            isLogin: localStorage.getItem('auth')
        })
    }

    componentDidMount() {
        if(this.state.datas){
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 500);
        }
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
    }

    shouldComponentUpdate(newProps, newState){
        if(newState){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.friendRequest){
            console.log('ada teman baru nih: ' + nextState.friendRequest)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    handleClick(value) {
       this.setState({friend_email: value, friend_send: {email: this.state.email,
        email_add: value}}, () => 
        axios({
            method: 'post',
            url: '/api/addfriend',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify(this.state.friend_send),
          }).then(result => this.setState({friend_status: result.data.status}, () => console.log('status teman: ', this.state.friend_status)))
        )
        
    }

    generateSkeleton() {
        const {datas} = this.state;
        return <div style={{marginBottom: 45}}>
        <Container>
        <Divider hidden />
            <Skeleton width="100%">
                <Header as="h2" textAlign="center">
            </Header>
            </Skeleton>
            <Divider/>
            {datas.map(data => {  
                return (
            <Grid columns={2} key={data._id}>
                <Grid.Column>
                <List verticalAlign="middle">
                    <List.Item>
                        <List.Content>
                            <List.Header><Skeleton/></List.Header>
                            <p><Skeleton/></p>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>

                <Grid.Column verticalAlign="middle">
                <Skeleton />
                </Grid.Column>
            </Grid>
            ); })}
        </Container>
        </div>
    }

    generateZeroData() {
        return <div><Header as='h2' icon textAlign='center'>
        <Image centered size='large' src='https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png' />
        <Header.Content>
            <Statistic>
                <Statistic.Value text>
                    Three<br />
                    Million
                </Statistic.Value>
                <Statistic.Label>Signups</Statistic.Label>
                <Divider/>
                <Statistic.Label>And You Have 0 Friends?</Statistic.Label>
                <Divider hidden/>
                <i><Link to="../">Find out more</Link></i>
            </Statistic>
        </Header.Content>
      </Header>
      </div>
    }

    render() {
        const {datas} = this.state;
        const {isLoading} = this.state;
        const {friend_status} = this.state;
        const {friend_status_email} = this.state;
        return (
            <div style={{marginBottom: 45}}>
            {datas.length === 0 ? this.generateZeroData() :
            isLoading ? this.generateSkeleton() :
            <Container>
                {datas.map(data => {
                    return (
                <Grid columns={2} key={data._id}>
                    <Grid.Column>
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                                <List.Content>
                                    <List.Header>{ data.email_friend}</List.Header>
                                    <p>{ data.status }</p>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                    <Button onClick={() => this.handleClick(data.email)} color="google plus" style={{width: "75px"}} size="mini" floated="right">
                        Unfriend
                    </Button>
                    </Grid.Column>
                </Grid>
                ); })}
            </Container>
            }
            </div>
        );
    }
}