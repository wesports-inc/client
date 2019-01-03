import React, { Component } from "react";
import { Header, Divider, Container } from 'semantic-ui-react';
import BottomMenu from '../../profile/MenuProfile';
import Skeleton from 'react-skeleton-loader';
import HeaderPeople from './HeaderPeople';
import AllPeople from "./allPeople";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: '',
            isLoading: true
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
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
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 500);
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

    generateSkeleton() {
        return <Header textAlign="center"><Skeleton/></Header>
    }



    render () {      
        const {isLoading} = this.state;
        return (
        <div style={{marginBottom: 45}}>
            <HeaderPeople />
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            {isLoading ? this.generateSkeleton() :
            <Container>
                <Header as="h2" textAlign="center" style={{marginTop: 25, color: "#f0f0f0"}}>
                    <i>More People, More Influencer</i>            
                </Header>
                <Divider/>
            </Container>
            }
            <Divider hidden/>
            <AllPeople/>
            <BottomMenu />
        </div>
        );
    }


}
