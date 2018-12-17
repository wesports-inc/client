import React, { Component } from "react"
import {Header, Container, Form, Divider, Grid, GridColumn, Image} from 'semantic-ui-react'

export default class AccountSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            username: localStorage.getItem('username')
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        console.log('oke')
    }
    render () {
        return (
        <div>
            <Header as='h3' dividing>
                Account Setting
            </Header>
            <Container>
            <Divider hidden/>
            <Form>
                <Form.Field>
                    <label>Your Email</label>
                    <input defaultValue={this.state.email} disabled/>
                </Form.Field>
                <Form.Field>
                    <label>Username</label>
                    <input defaultValue={this.state.username} disabled/>
                </Form.Field>
            </Form>
            <br />
            <p><a>Password</a></p>
            <p><a>Self Destroy</a></p>
            <Divider hidden/>
            </Container>
        </div>
        );
    }
}
