import React, { Component } from "react"
import { Button, Form, Container, Grid, Divider,Label, Header, Icon, Message, Segment } from 'semantic-ui-react'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            first_name: '',
            last_name: '',
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
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
        }
        fetch('/api/register', {
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
        const registButton = {
            padding: '1%',
        };
        const rButton = {
            width: '47%',
        };
        return (
            <Container>
            <Divider hidden />
                <Grid textAlign='center' style={{ height: '100%' }} columns={1} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450}}>
                <Divider hidden />
                <Divider hidden />
                    <Header as="h3">
                    <Icon name='file alternate outline' size="large" />Registrasi Akun Baru
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input 
                            fluid icon='mail'
                            iconPosition='left'
                            placeholder='Alamat e-mail'
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                        <Form.Input 
                            fluid icon='user circle outline'
                            iconPosition='left'
                            placeholder='Username'
                            name="username"
                            onChange={this.handleChange}
                        />
                        <Form.Input 
                            fluid icon='pencil alternate'
                            iconPosition='left'
                            placeholder='First name'
                            name="first_name"
                            onChange={this.handleChange}
                        />
                        <Form.Input 
                            fluid icon='pencil alternate'
                            iconPosition='left'
                            placeholder='Last name'
                            name="last_name"
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
                        Daftar
                        </Button>
                    </Segment>
                    </Form>
                </Grid.Column>
                <Grid.Column verticalAlign="middle" style={registButton}>
                    <Button content='Register with Google' icon='google' color="google plus" size='mini'  style={rButton} />
                    <Button content='Register with Facebook' icon='facebook' color="facebook" size='mini' style={rButton} />
                </Grid.Column>
                </Grid>
                <Divider />
            </Container>
        );
    }
}