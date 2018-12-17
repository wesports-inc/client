import React, { Component } from "react"
import {Header, Container, Form, Divider, Grid, GridColumn, Image, Select} from 'semantic-ui-react'
import './Account.css'

export default class ProfileSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            username: '',
            first_name: '',
            last_name: '',
            gender: '',
            avatar: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        this.setState({
            username: localStorage.getItem('username'),
            first_name: localStorage.getItem('first_name'),
            last_name: localStorage.getItem('last_name')
        })
    }

    componentDidMount(){
        console.log('data: ', this.state)
    }

    handleChange() {
        console.log('...')
    }

    render () {
        const options = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
          ]          
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
                        <input placeholder='first name' defaultValue={this.state.first_name} onChange={this.handleChange()}/>
                        <Divider hidden/>
                        <label>Last Name</label>
                        <input placeholder='last name' defaultValue={this.state.last_name} onChange={this.handleChange()}/>
                        <Divider hidden/>
                        <label>Phone Number</label>
                        <input placeholder='0811xxxxx'/>
                    </Form.Field>
                    <Divider hidden/>
                    <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' defaultValue={this.state.gender} />
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
