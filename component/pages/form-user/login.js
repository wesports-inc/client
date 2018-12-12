import React, { Component } from "react";
import { Button, Form, Container, Grid, Divider,Label, Header, Icon, Message, Segment } from 'semantic-ui-react'

export default class MenuProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: false
        };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
      console.log('before render:', this.state.isLogin);
    }

    componentDidMount() {
        const {isLogin} = this.state
        console.log('after render, isLogin become: ', isLogin);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('component will update: ');
    }


    handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
            [name]: value 
        }, () => console.log('user typing ... ', this.state))
    }

    handleSubmit(event) {
        const { email, password, isLogin } = this.state;
        event.preventDefault();
        console.log('data after submit: ', this.state);
        email === 'admin' && password === '123' && isLogin === true ? window.location = '#/profile' : alert('something went wrong ...');
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
                        <Form.Input name="isLogin" type="checkbox" value={this.state.isLogin} onChange={this.handleChange}/> 
                        
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