import React, { Component } from "react"
import {Container, Divider, Grid, GridColumn, Menu} from 'semantic-ui-react';
import HeaderMenu from './header-menu-setting'
import MenuProfile from '../MenuProfile'

import AccountSetting from './account-setting'
import ProfileSetting from './profile-setting'

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: ''
        };
    }

    componentWillMount() {
        const email = JSON.parse(localStorage.getItem('email'))
        const auth = JSON.parse(localStorage.getItem('auth'))
        this.setState({
            email,
            isLogin: auth
        })
    }

    componentDidMount() {
        if(this.state.isLogin != true){
            window.location='#/login';
        }
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.isLogin){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.isLogin === "false" ? window.location = '#/login' : '';
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
    }

    render () {
        return (
            <div>
            <HeaderMenu/>
            <Container>
            <Divider hidden />
                <Grid columns={1}>
                    <GridColumn>
                        <AccountSetting/>
                        <ProfileSetting/>
                    </GridColumn>
                </Grid>
            </Container>
            <MenuProfile/>
            </div>
        );
    }


}
