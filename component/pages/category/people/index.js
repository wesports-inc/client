import React, { Component } from "react";
import { Dimmer, Loader, Image, Segment, Header, Divider, Container } from 'semantic-ui-react';
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
            isLoading: true,
            loading: true
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
        this.loading = this.loading.bind(this)
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
        console.log('first ', this.state.loading)
        setTimeout(() => {
            if(this.state.loading == true){
                this.setState({loading: false}, () => console.log('end: ', this.state.loading))
            }
        }, 1500)
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

    loading() {
        return (
            <div>    
                <Dimmer active inverted>
                    <Loader size='large'>Plase Wait</Loader>
                </Dimmer>    
            </div>  
        );
    }

    generateSkeleton() {
        return <Header textAlign="center"><Skeleton/></Header>
    }

    render () {
        const { loading} = this.state;     
        const {isLoading} = this.state;
        return (
        <div style={{marginBottom: 45}}>
            <HeaderPeople />
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            {loading ? (this.loading()) : loading ? this.generateSkeleton() :
            <Container>
                <Header as="h2" textAlign="center" style={{marginTop: 25}}>
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
