import React, { Component } from "react"
import {Header, Container, Form, Divider, Grid, GridColumn, Image} from 'semantic-ui-react'
import './Account.css'

export default class ProfileSetting extends Component {
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
                Profile Setting
            </Header>
            <Container>
            <Divider hidden/>
                <Grid verticalAlign="middle" columns={2}>
                    <GridColumn>
                        <Image size="small" src='https://react.semantic-ui.com/images/wireframe/square-image.png' circular />
                    </GridColumn>
                    <GridColumn>
                        <Form>
                            <Form.Field>
                                <label style={{textAlign: "center"}}>Your Avatar</label>
                                <div className="input-file-container">
                                    <input className="input-file" id="my-file" type="file" />
                                    <label htmlFor="my-file" className="input-file-trigger" style={{textAlign: "center"}}>upload</label>
                                </div>
                            <p className="file-return"></p>
                            </Form.Field>
                        </Form>
                    </GridColumn>
                </Grid>
                <Divider hidden/>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='first name' onChange={this.handleChange()}/>
                        <Divider hidden/>
                        <label>First Name</label>
                        <input placeholder='last name' onChange={this.handleChange()}/>
                        <Divider hidden/>
                        <label>Phone Number</label>
                        <input placeholder='0811xxxxx' onChange={this.handleChange()}/>
                    </Form.Field>
                </Form>
                <Divider hidden/>
                <Divider hidden/>
                <Divider hidden/>
            </Container>
            <Divider hidden/>
            <Divider hidden/>
        </div>
        );
    }
}
