import React, { Component } from "react"
import { Button, Form, Container, Grid, Divider,Label, Header, Icon, Message, Segment } from 'semantic-ui-react'
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.setState({
            isLogin: localStorage.getItem('auth')
        })
    }

    componentDidMount() {
        const {isLogin} = this.state
        isLogin === "true" ? window.location = '#/profile' : ''
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
        if(isLogin === true){ 
            localStorage.setItem('email', JSON.stringify(this.state.email))
            localStorage.setItem('auth', JSON.stringify(this.state.isLogin))
            window.location = '#/profile'
        }
    }


    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value 
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(status => this.setState({ isLogin: status.auth, token: status.token }));
    }

    render() {
        return (
            <Container>
            <Divider hidden />
                <Grid textAlign='center' style={{ height: '100%' }} columns={1} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450}}>
                <Divider hidden />
                <Divider hidden />
                    <Header as="h3">
                    <Icon name='user circle' size="large" />Login Account
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input 
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='Alamat e-mail'
                            name="email"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            onChange={this.handleChange}
                        />      
                        <Button color='blue' fluid size='large'>
                        Masuk
                        </Button>
                    </Segment>
                    </Form>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    <Button content='Sign in with Google' color="google plus" icon='google' size='mini' />
                    <Button content='Sign in with Facebook' icon='facebook' color="facebook" size='mini' />
                </Grid.Column>
                </Grid>
                <Divider />
                <Message>
                    Belum punya akun? <a href='#'>Daftar Disini</a>
                </Message>
            </Container>
        );
    }
}