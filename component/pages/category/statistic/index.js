import React, { Component } from "react"
import { Dimmer, Loader, Container, Grid, Divider, Image, List, Header, Button, Icon } from 'semantic-ui-react';
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
            loading: true,
            friend_email: localStorage.getItem('email').slice(1, -1),
        };
    }

    componentWillMount() {
        if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
            // this.setState({loading: false})
            setTimeout(() =>  {
                this.setState({loading: false})
            }, 100)
        }
       
    }

    componentDidMount() {
        if(this.state.datas){
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 500);
        }
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
        // console.log('first ', this.state.loading)
        // setTimeout(() => {
        //     if(this.state.loading == true){
        //         this.setState({loading: false}, () => console.log('end: ', this.state.loading))
        //     }
        // }, 500)
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

    loading() {
        return (
            <div>
                <Dimmer active inverted>
                    <Loader size='large'>Plase Wait</Loader>
                </Dimmer>
            </div>        
        );
    }

    render() {
        const {datas} = this.state;
        const {isLoading, loading} = this.state;
        return (
            <div style={{marginBottom: 45}}>
                {loading ? (this.loading()
                    ) : (
                        <div>
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
                    )}
            </div>
        );
    }
}