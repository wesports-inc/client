import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Icon } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import HeaderStatistic from './HeaderStatistic';
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
        };
    }

    componentWillMount() {
       
    }

    componentDidMount() {
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
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    render() {
        const {datas} = this.state;
        const {isLoading} = this.state;
        return (
            <div style={{marginBottom: 45}}>
            <HeaderStatistic/>
            <Container>
                <Grid columns={2}>
                    <Grid.Column>
                        
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                   
                    </Grid.Column>
                </Grid>
            </Container>
            <MenuProfile/>
            </div>
        );
    }
}