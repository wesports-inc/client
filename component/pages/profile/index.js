import React, { Component } from "react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MoreCategory from './MoreCategory';

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

    render () {
        return (
        <div>
            <HeaderProfile />
            <MoreCategory />
            <MyPost />
            <MenuProfile />
        </div>
        );
    }


}
