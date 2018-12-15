import React, { Component } from "react"
import {Header, Container, Form, Divider, Grid, GridColumn, Image} from 'semantic-ui-react'

export default class AccountSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            yourEmail: ''
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
                    <input placeholder='email...' onChange={this.handleChange()}/>
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
