import React, { Component } from "react"
import {Header, Container, Form, Divider, Grid, GridColumn, Image, Select,Dropdown,Button} from 'semantic-ui-react'
import './Account.css'
import axios from 'axios'

export default class ProfileSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            username: '',
            first_name: '',
            last_name: '',
            gender: '',
            avatar: '',
            option : [],
            value: [],
            tags : []

        }
        this.handleTags = this.handleTags.bind(this)
    }

    componentWillMount() {
        this.setState({
            username: localStorage.getItem('username'),
            first_name: localStorage.getItem('first_name'),
            last_name: localStorage.getItem('last_name'),
        })

        axios({
            method: 'get',
            url: '/api/tags',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(result => this.setState({option: result.data}));
          
        axios({
            method: 'get',
            url: '/api/user',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: this.state.email, // This is the body part
              }
        }).then(result => this.setState({tags: result.data[0].tags}));
    }

    componentDidMount(){
        console.log('data: ', this.state)
    }

    update() {
        event.preventDefault();
            var data = {
                email: this.state.email,
                tags: this.state.value
            }
            fetch('/api/user/tags', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(console.log('sukses terkirim...'));
      }

      handlePost(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value 
        })
        console.log('data berubah: ', value)
      }

    setValue(e, data) {
        this.setState({ value: data.value })
        console.log('tags :', data.value)
    }

    handleTags = (event) => {
        this.setState({ value: event.target.value });
    }

    render () {
        const {option, value,tags} = this.state;
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
                        <input placeholder='first name' defaultValue={this.state.first_name} onChange={this.handlePost.bind(this)}/>
                        <Divider hidden/>
                        <label>Last Name</label>
                        <input placeholder='last name' defaultValue={this.state.last_name} onChange={this.handlePost.bind(this)}/>
                        <Divider hidden/>
                        <label>Phone Number</label>
                        <input placeholder='0811xxxxx'/>
                    </Form.Field>
                    <Divider hidden/>
                    <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' defaultValue={this.state.gender} />
                    <Divider hidden/>
                    <label>Tags Yang Telah Di Pilih</label>
                    <br />

                    {tags}
                    <Divider hidden/>
                    <Dropdown placeholder='tags' style={{position: 'relative' , 
                        display: 'block',}}
                        
                        onChange={this.setValue.bind(this)}
                        fluid multiple selection
                        options={option}
                        value={value}
                    />
                    <Divider hidden />
                    <Button
                        primary
                        icon='checkmark'
                        labelPosition='right'
                        content="Update Profile"
                        onClick={this.update.bind(this)}
                    />
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
