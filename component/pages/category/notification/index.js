import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Icon, Statistic } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import HeaderNotification from './HeaderNotification';
import MenuProfile from '../../profile/MenuProfile';
import axios from 'axios';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            datas: [],
            isLogin: '',
            friend_email: localStorage.getItem('email').slice(1, -1),
            friend_status: '',
            friend_status_email: '',
            isLoading: true,
            friend_send: {}
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
        this.generateZeroData = this.generateZeroData.bind(this)
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/friend/notif',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.friend_email, // This is the body part
            }
          }).then(result => this.setState({datas: result.data}));
        this.setState({
            isLogin: localStorage.getItem('auth')
        })
    }

    componentDidMount() {
        console.log('menu: ', localStorage.getItem('menu'))
        if(this.state.datas){
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 500);
        }
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
    }

    shouldComponentUpdate(newProps, newState){
        if(newState){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.friendRequest){
            console.log('ada teman baru nih: ' + nextState.friendRequest)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    handleClick(value) {
        this.setState({friend_send: {email: value,
            email_friend: localStorage.getItem('email').slice(1, -1)}}, () => 
            axios({
                method: 'put',
                url: '/api/friend/confirm',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify(this.state.friend_send),
              }).then(result => console.log('CONFIRM ------------> : ', result))
            )
    }

    generateSkeleton() {
        const {datas} = this.state;
        return <div style={{marginBottom: 45}}>
        <Container>
        <Divider hidden />
            <Skeleton width="100%">
                <Header as="h2" textAlign="center">
            </Header>
            </Skeleton>
            <Divider/>
            {datas.map(data => {  
                return (
            <Grid columns={2} key={data._id}>
                <Grid.Column>
                <List verticalAlign="middle">
                    <List.Item>
                        <List.Content>
                            <List.Header><Skeleton/></List.Header>
                            <p><Skeleton/></p>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>

                <Grid.Column verticalAlign="middle">
                <Skeleton />
                </Grid.Column>
            </Grid>
            ); })}
        </Container>
        </div>
    }

    generateZeroData() {
        return <div>  
        <Header as='h2' icon textAlign='center'>
        <Image centered size='large' src='https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png' />
        <Header.Content>
            <Statistic>
                <Statistic.Value text>
                    Hell Yeah,
                </Statistic.Value>
                <Statistic.Label><i>0 Million</i></Statistic.Label>
                <Statistic.Label>Notification</Statistic.Label>
            </Statistic>
        </Header.Content>
      </Header>
      </div>
    }

    render() {
        const {datas} = this.state;
        console.log('banyaknya data:', datas.length)
        const {isLoading} = this.state;
        return (
            <div style={{marginBottom: 45}}>
            <HeaderNotification/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            {datas.length === 0 ? this.generateZeroData() :
            isLoading ? this.generateSkeleton() :
            <Container>
                {datas.map(data => {  
                    return (
                <Grid columns={2} key={data._id}>
                    <Grid.Column>
                        <List verticalAlign="middle">
                            <List.Item>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                                <List.Content>
                                    <List.Header>{ data.email.slice(0, -10) }</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                    <Button icon onClick={() => this.handleClick(data.email)} primary style={{width: "75px"}} size="mini" floated="right">
                        <Icon name='check circle outline' />
                    </Button>
                    </Grid.Column>
                </Grid>
                ); })}
            </Container>
            }
            <MenuProfile/>
            </div>
        );
    }
}