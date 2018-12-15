import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Icon, GridColumn, Form } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios';

export default class Requested extends Component {
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
    }

    componentWillMount() {
          axios({
            method: 'post',
            url: '/api/friend/status/pending',
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
        console.log('status teman: ', this.state.friend_status)
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

    render() {
        const {datas} = this.state;
        const {isLoading} = this.state;
        return (
            <div style={{marginBottom: 45}}>
            {isLoading ? this.generateSkeleton() :
            <Container>
                {datas.map(data => {
                    return (
                <Grid columns={2} key={data._id}>
                    <Grid.Column>
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                                <List.Content>
                                    {/* hapus text email sementara selama backend blm ada username*/}
                                    <List.Header>@{ data.email_friend.slice(0, -10) }</List.Header>
                                    <i>{data.status}</i>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                    <Button icon onClick={() => this.handleClick(data.email_friend)} style={{width: "75px"}} size="mini" floated="right">
                        <Icon name='hourglass outline' />
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