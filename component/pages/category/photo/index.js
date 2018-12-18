import React, { Component } from "react"
import { Container, Grid } from 'semantic-ui-react'
import HeaderPhoto from './HeaderPhoto'
import Content from './Content'
import MenuProfile from '../../profile/MenuProfile'

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
        return (
            <div style={{marginBottom: 45}}>
            <HeaderPhoto/>
            <Container>
                <Content/>
            </Container>
            <MenuProfile/>
            </div>
        );
    }
}