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
            phone_number: '',
            gender: '',
            avatar: '',
            file: null,
            reload: '0',
            option : [],
            value: [],
            tags : [],
            option_gender : []

        }
        this.handleTags = this.handleTags.bind(this)
    }

    componentWillMount() {

        axios({
            method: 'get',
            url: '/api/tags',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(result => this.setState({option: result.data}));
          
        axios({
            method: 'post',
            url: '/api/user',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: this.state.email, // This is the body part
              }
        }).then(result => this.setState({tags: result.data.tags, first_name: result.data.first_name, last_name: result.data.last_name
            , phone_number: result.data.phone_number, gender: result.data.jenis_kelamin
        }, console.log(result)));

        axios({
            method: 'post',
            url: '/api/user/avatar',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: this.state.email, // This is the body part
            }
        }).then(result => this.setState({ avatar: result.data}))
    }

    shouldComponentUpdate(newProps, newState){
        console.log('shouldComponentUpdate')
        if(newState){
            console.log('as', newState.reload)
            return true;   
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.reload == '1'){
            const data = new FormData()
            data.append('avatar', this.state.file, this.state.file.name)
            data.append('email', this.state.email)
            console.log(data)
                    
            axios.post('/api/upload/avatar', data)
            .then( () => 
                axios({
                    method: 'post',
                    url: '/api/user/avatar',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: {
                        email: this.state.email, // This is the body part
                    }
                    }).then(result => this.setState({ avatar: result.data, reload: '0'}, console.log(this.state.avatar)))
            )
        }
    }

    componentDidMount(){
        console.log('reload: ', this.state.reload)
    }

    update() {
        event.preventDefault();
            var data = {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: this.state.phone_number,
                gender: this.state.gender,
                tags: this.state.value
            }
            fetch('/api/user/tags', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(window.location.reload());
    }

    fileHandler = event => {
        this.setState({
            file: event.target.files[0],
            reload: '1'
        })
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
    setGender(e, data){
        this.setState({ gender: data.value})
        console.log('Gender :', data.value)
    }

    handleTags = (event) => {
        this.setState({ value: event.target.value });
    }

    render () {
        const {option,value,tags,first_name,last_name,phone_number,gender} = this.state;
        const option_gender = [
            {text: 'Laki-laki', value: 'Laki-laki'},
            {text: 'Perempuan', value: 'Perempuan'},
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
                        <Image size="small" src={"http://localhost:3000/src/web-api/public/avatar/"+ this.state.avatar} circular />
                    </GridColumn>
                    <GridColumn>
                        <Form>
                            <Form.Field>
                                <label style={{textAlign: "center"}}>Your Avatar</label>
                                <div className="input-file-container">
                                    <input className="input-file" id="my-file" type="file" onChange={this.fileHandler}/>
                                    <label htmlFor="my-file" className="input-file-trigger" style={{textAlign: "center"}}>Pilih foto</label>
                                    <br />
                                    <br />
                                    <br />
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
                        <input placeholder='first name' name='first_name' defaultValue={first_name} onChange={this.handlePost.bind(this)}/>
                        <Divider hidden/>
                        <label>Last Name</label>
                        <input placeholder='last name' name='last_name' defaultValue={last_name} onChange={this.handlePost.bind(this)}/>
                        <Divider hidden/>
                        <label>Phone Number</label>
                        <input placeholder='0811xxxxx' name='phone_number' defaultValue={phone_number} onChange={this.handlePost.bind(this)}/>
                    </Form.Field>
                    <Divider hidden/>
                    <label>Gender</label>
                    <Dropdown placeholder='Gender' style={{position: 'relative' , 
                        display: 'block',}}
                        
                        onChange={this.setGender.bind(this)}
                        options={option_gender}
                        fluid selection
                        value={gender}
                    />
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
