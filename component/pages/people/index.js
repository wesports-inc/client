import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Icon, GridColumn } from 'semantic-ui-react';
import BottomMenu from '../profile/MenuProfile';
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: '',
            token: ''
        };
    }

    componentWillMount() {
        this.setState({
            isLogin: localStorage.getItem('auth'),
            email: localStorage.getItem('email')
        }, () =>
        fetch('/api/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.email.slice(1, -1))
        }).then(console.log('data sended: ', this.state.email.slice(1, -1))))
    }

    componentDidMount() {
        console.log('email============', this.state.email.slice(1, -1))
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.isLogin){
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

    render() {
        return (
            <div>
            <Container>
            <Divider hidden />
                <Header as="h2" textAlign="center">
                    Add People, More Circle
                </Header>
                <Divider/>
                <Grid style={{ height: '100%' }} columns={2}>
                    <Grid.Column style={{ maxWidth: 450}}>
                    <List verticalAlign="middle" selection>
                            <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                            <List.Content>
                                <List.Header>Tom</List.Header>
                                Top Contributor
                            </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                    <Button animated='vertical' primary size="mini" style={{width: "80px"}} floated="right">
                        <Button.Content hidden>Waiting...</Button.Content>
                        <Button.Content visible>
                            <Icon name='add circle' />
                        </Button.Content>
                    </Button>
                    </Grid.Column>
                </Grid>
            </Container>
            <BottomMenu />
            </div>
        );
    }
}