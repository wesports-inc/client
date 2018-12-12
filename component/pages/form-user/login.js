import React, { Component } from "react";
import { Button, Form, Container, Grid, Divider, Header, Icon, Message, Segment } from 'semantic-ui-react'

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
        [name]: value 
    }, () => console.log('user typing ... ', this.state))
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    console.log('data after submit: ', this.state);
    email === 'admin' && password === '123' ? window.location = '#/profile' : alert('email or password not matches...');
  }

  render() {
    return (
        <Container>
        <Divider hidden />
            <Grid textAlign='center' style={{ height: '100%' }} columns={1} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450}}>
                <Header as='h2' color='blue' textAlign='center'>
                <Icon name='user outline' size="large"/>  Masuk Akun
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