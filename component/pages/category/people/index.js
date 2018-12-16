import React, { Component } from "react";
import { Header, Divider } from 'semantic-ui-react';
import BottomMenu from '../../profile/MenuProfile';
import Skeleton from 'react-skeleton-loader';
import Filter from './filter';

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
        <div>
            {isLoading ? this.generateSkeleton() :
            <Header as="h2" textAlign="center" style={{marginTop: 25}}>
                <i>Add People, More Circle</i>
            </Header>
            }
            <Divider />
            {isLoading ? this.generateSkeleton() :
            <Filter />
            }
            <BottomMenu />
        </div>
        );
    }


}
