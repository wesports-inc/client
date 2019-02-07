import React, { Component } from "react";
import MenuProfile from '../profile/MenuProfile';
import Content from "./content";
import { Dimmer, Loader, Image,Segment, Container } from "semantic-ui-react";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: '',
            loading: true,
        };
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

    componentDidUpdate(prevProps, prevState) {
        
    }

    loading() {
        return (
            <Container>
                <Segment>
                <Dimmer active inverted size='large'>
                    <Loader inverted >Loading</Loader>
                </Dimmer>

                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'
                />
                </Segment>
            </Container>
            
        );
    }

    render () {
        const { loading } = this.state;
        return (
        <div> 
            {loading ? (this.loading()
            ) : (
                <Container>
                    <Content />
                    <MenuProfile />
                </Container>
                )}
        </div>
        );
    }


}
