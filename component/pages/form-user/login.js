import React, { Component } from "react"
import { Button, Form, Container, Grid, Divider,Label, Header, Icon, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: false,
            token: ''
        };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        const email = this.state.email
        console.log('willmounting...', email)
        axios.get('/api/user')
        .then(db => {
            console.log('data:::: ', db.data)
        })
    }

    componentDidMount() {
        const {isLogin} = this.state
        console.log('after render, isLogin become: ', isLogin);
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.isLogin){
            console.log('oucchh.. there is New State here: ', newState.isLogin);
            return true;
        }else{
            console.log('HMMM... there is NO New State for any variable');
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('then i will Updating new State : ', nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLogin} = this.state;
        if(isLogin === true){ 
            localStorage.setItem('userdata', JSON.stringify(this.state))
            window.location = '#/profile'
        }
        console.log('Lookup previous isLogin State change into: ', isLogin + ' from: ', prevState.isLogin);
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
        console.log(data)
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
            <Container statedata={this.state.isLogin.toString()}>
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