import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Icon, GridColumn, Form } from 'semantic-ui-react';
import BottomMenu from '../profile/MenuProfile';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            datas: [],
            password: '',
            isLogin: '',
            token: '',
            friend_email: '',
            friend_status: ''
        };
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/search/people',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.email, // This is the body part
            }
          }).then(result => this.setState({datas: result.data}));
        this.setState({
            isLogin: localStorage.getItem('auth').slice(1, -1)
        }, () =>
        console.log('my email:', this.state.email))
    }

    componentDidMount() {
        console.log('DATA BARU: ', this.state.datas)
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
    }

    shouldComponentUpdate(newProps, newState){
        if(newState){
            console.log('ada yg berubah:' + newState.friend_email)
            return true;
        }else{
            console.log('tidak ada berubah')
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('akan berubah jadi: ' + nextState.friend_email)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('sebelumnya:', prevState.friend_email)
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    handleClick(value) {
       this.setState({friend_email: value})
    }

    render() {
        const {datas} = this.state;
        return (
            <div>
            <Container>
            <Divider hidden />
                <Header as="h2" textAlign="center">
                    Add People, More Circle
                </Header>
                <Divider/>
                {datas.map(data => {  
                    return (
                <Grid style={{ height: '100%' }} columns={2} key={data._id}>
                    <Grid.Column style={{ maxWidth: 450}}>
                    <List verticalAlign="middle" selection >
                            <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                            <List.Content>
                                <List.Header>{ data.first_name } {data.last_name}</List.Header>
                                 @{ data.username }
                            </List.Content>
                            </List.Item>
                        </List>
                    
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                    <Button onClick={() => this.handleClick(data.email)} animated='vertical' primary size="mini" style={{width: "80px"}} floated="right">
                        <Button.Content hidden>Waiting...</Button.Content>
                        <Button.Content visible>
                            <Icon name='add circle' />
                        </Button.Content>
                    </Button>
                    </Grid.Column>
                </Grid>
                ); })}
            </Container>
            <BottomMenu />
            </div>
        );
    }
}