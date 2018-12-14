import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Icon, GridColumn, Form } from 'semantic-ui-react';
import BottomMenu from '../profile/MenuProfile';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            datas: [],
            password: '',
            isLogin: '',
            token: '',
            friend_email: '',
            friend_status: '',
            isLoading: true
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/search/people',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.email, // This is the body part
            }
          }).then(result => this.setState({datas: result.data}));

        this.setState({
            isLogin: localStorage.getItem('auth').slice(1, -1)
        })
    }

    componentDidMount() {
        if(this.state.datas){
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 1500);
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
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    handleClick(value) {
       this.setState({friend_email: value})
    }

    generateSkeleton() {
        const {datas} = this.state;
        return <div style={{marginBottom: 45}}>
        <Container>
        <Divider hidden />
            <Header as="h2" textAlign="center">
                <Skeleton/>
            </Header>
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
            <Divider hidden />
                <Header as="h2" textAlign="center">
                    Add People, More Circle
                </Header>
                <Divider/>
                {datas.map(data => {  
                    return (
                <Grid columns={2} key={data._id}>
                    <Grid.Column>
                    <List verticalAlign="middle">
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                            <List.Content>
                                <List.Header>{ data.first_name } {data.last_name}</List.Header>
                                <p>@{ data.username }</p>
                            </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>

                    <Grid.Column verticalAlign="middle">
                    <Button onClick={() => this.handleClick(data.email)} animated='vertical' primary size="mini" style={{width: "80px"}} floated="right">
                        <Button.Content hidden>Waiting...</Button.Content>
                        <Button.Content visible>
                            <Icon name='add circle' />
                        </Button.Content>
                    </Button>
                    </Grid.Column>
                </Grid>
                ); })}
            </Container>
            }
            <BottomMenu />
            </div>
        );
    }
}