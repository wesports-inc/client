import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Modal } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios';

export default class allPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            datas: [],
            isLogin: '',
            friendship: [],
            isLoading: true,
            email_friend: '',
            open: false,
            fotos: '',
            allfoto: []
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/friend',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.email, // This is the body part
            }
          }).then(result => this.setState({datas: result.data.user, allfoto: result.data.foto}));
        this.setState({
            isLogin: localStorage.getItem('auth')
        })
    }

    componentDidMount() {
        if(this.state.datas){
            this.setState({isLoading: false})
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

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.email_friend){
        axios({
            method: 'post',
            url: '/api/profile',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: this.state.email_friend
            }, // This is the body part
          }).then(result => this.setState({friendship: result.data}))
        }
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    handleClick(value) {
        this.setState({email_friend: value, dimmer: 'blurring', open: true}, () => axios({
            method: 'post',
            url: '/api/user/avatar',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: value
            }, // This is the body part
          }).then(result => this.setState({fotos: result.data})))
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

    loop() {
        const test = []
        const {allfoto} = this.state
        allfoto.map(fotox => test.push(fotox.avatar))
        return test
    }

    gotoprofile(username) {
        sessionStorage.setItem('username', username)
        window.location='#/user/profile';
    }

    close = () => this.setState({ open: false, email_friend: '' }, () => sessionStorage.removeItem('username'))
    
    render() {
        const { datas, isLoading, friendship, open, dimmer, fotos, allfoto } = this.state
        return (
            <div style={{marginBottom: 45}}>
            {isLoading ? this.generateSkeleton() :
            <Container>
                {datas.map(data => {  
                    return (
                <Grid columns={1} key={data._id}>
                    <Grid.Column>
                        <List verticalAlign="middle" onClick={() => {this.handleClick(data.email)}}>
                            <List.Item>
                                <Image avatar src={"http://localhost:3000/src/web-api/public/avatar/" + data.foto} />
                                <List.Content>
                                    <List.Header>{ data.first_name } {data.last_name}</List.Header>
                                    <p>@{ data.username }</p>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
                ); })}
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon>
            <Modal.Header>{friendship.first_name} {friendship.last_name}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={"http://localhost:3000/src/web-api/public/avatar/" + fotos} />
                <Modal.Description>
                <Header>{friendship.username}</Header>
                <span>
                    <span style={{float: "left"}}>thanks: {friendship.total_thanks}</span>
                    <span style={{float: "right"}}>posts: {friendship.total_posts}</span>
                    <br/>
                    <hr/>
                    <p>Followed Tags: <a>{friendship.tags}</a></p> 
                </span>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                primary
                content="View Profile"
                fluid
                onClick={() => this.gotoprofile(friendship.username)}
                style={{marginLeft: -0}}
                />
            </Modal.Actions>
        </Modal>
            </Container>
            }
            </div>
        );
    }
}