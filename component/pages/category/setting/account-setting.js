import React, { Component } from "react"
import {Header, Container, Form, Divider,Button,Modal,Icon} from 'semantic-ui-react'

export default class AccountSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            username: localStorage.getItem('username'),
            password_lama: '',
            password_baru: '',
            modalOpen: false,
            modalOpenPassword: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleOpenPassword = () => this.setState({ modalOpenPassword: true })

    handleClosePassword = () => this.setState({ modalOpenPassword: false })

    handleChange() {
        console.log('oke')
    }

    delete() {
        event.preventDefault();
            var data = {
                email: this.state.email,
            }    
            fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(
                console.log(data.email, 'Telah Menghapus Akun'),
                localStorage.removeItem('email'),
                localStorage.removeItem('auth'),
                localStorage.removeItem('menu'),
                window.location='#/login')
    }

    ubahPassword() {
        event.preventDefault();
            var data = {
                email: this.state.email,
                password_lama: this.state.password_lama,
                password_baru: this.state.password_baru
            }
            fetch('/api/user/ubahpassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(
                this.setState({modalOpenPassword: false}))
    }
    handlePost(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value 
        })
        console.log('data berubah: ', value)
      }

    render () {
        return (
        <div>
            <Header as='h3' dividing>
                Account Setting
            </Header>
            <Container>
            <Divider hidden/>
            <Form>
                <Form.Field>
                    <label>Your Email</label>
                    <input defaultValue={this.state.email} disabled/>
                </Form.Field>
                <Form.Field>
                    <label>Username</label>
                    <input defaultValue={this.state.username} disabled/>
                </Form.Field>
                <Modal trigger={<Button primary icon="exchange" labelPosition="right" content="Ubah Password" 
                            onClick={this.handleOpenPassword}/>}  open={this.state.modalOpenPassword}
                            onClose={this.handleClosePassword} basic size='small'>
                <Header icon='exchange' content='Ubah Password' />
                <Modal.Content>
                    <label>Password Lama : </label>
                    <input type="password" name="password_lama" onChange={this.handlePost.bind(this)}/>
                    <br />
                    <br />
                    <label>Password Baru : </label>
                    <input type="password" name="password_baru" onChange={this.handlePost.bind(this)}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' onClick={this.handleClosePassword} inverted>
                        <Icon name='remove' /> No
                    </Button>
                    <Button basic color='red' onClick={this.ubahPassword.bind(this)} inverted>
                        <Icon name='checkmark' /> Ubah Password
                    </Button>
                </Modal.Actions>
            </Modal>
            </Form>
            <br />
            <Modal trigger={<Button primary icon="trash" labelPosition="right" content="Hapus Akun Anda" 
                            onClick={this.handleOpen}/>}  open={this.state.modalOpen}
                            onClose={this.handleClose} basic size='small'>
                <Header icon='trash' content='Menghapus Akun Anda!!' />
                <Modal.Content>
                <p>
                Yakin Ingin Menghapus akun?
                </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' onClick={this.handleClose} inverted>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={this.delete.bind(this)}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <Divider hidden/>
            </Container>
        </div>
        );
    }
}
