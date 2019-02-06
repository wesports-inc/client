import React, { Component } from "react";
import {
  Header,
  Container,
  Form,
  Divider,
  Grid,
  GridColumn,
  Image,
  Select,
  Dropdown,
  Button,
  Modal
} from "semantic-ui-react";
import "./Account.css";
import axios from "axios";

export default class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      gender: "",
      first_name2: "",
      last_name2: "",
      phone_number2: "",
      gender2: "",
      avatar: "",
      file: null,
      reload: "0",
      option: [],
      value: [],
      tags: [],
      option_gender: [],
      modalNotification: false,
      kode: 0,
      // message: '3'
    };
    this.handleTags = this.handleTags.bind(this);
  }

  handleOpenNotification = () => this.setState({ modalNotification: true });

  handleCloseNotification = () => setTimeout(() => {
    this.setState({ modalNotification: false })
  }, 4500);

  componentWillMount() {
    axios({
      method: "get",
      url: "/api/tags",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result => this.setState({ option: result.data }));

    axios({
      method: "post",
      url: "/api/user",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result =>
      this.setState(
        {
          tags: result.data.tags,
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          phone_number: result.data.phone_number,
          gender: result.data.jenis_kelamin,
          first_name2: result.data.first_name,
          last_name2: result.data.last_name,
          phone_number2: result.data.phone_number,
          gender2: result.data.jenis_kelamin,
        },
      )
    );

    axios({
      method: "post",
      url: "/api/user/avatar",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ avatar: result.data }));
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.reload == "1") {
      const data = new FormData();
      data.append("avatar", this.state.file, this.state.file.name);
      data.append("email", this.state.email);

      axios.post("/api/upload/avatar", data).then(() =>
        axios({
          method: "post",
          url: "/api/user/avatar",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: {
            email: this.state.email // This is the body part
          }
        }).then(result =>
          this.setState(
            { avatar: result.data, reload: "0" },
          )
        )
      );
    }
  }

  update() {
    event.preventDefault();
    var data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
      gender: this.state.gender,
      tags: this.state.value
    };
    if(this.state.kode == 1){
      this.setState({kode: 0})
    }else{
      this.setState({kode: 0})
    }
    if(this.state.first_name != this.state.first_name2 || this.state.last_name != this.state.last_name2 || this.state.phone_number != this.state.phone_number2 || this.state.gender != this.state.gender2){
      fetch("/api/user/tags", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      }).then(window.location.reload());
    }else{
      this.setState({kode: 1})
  }
  }

  fileHandler = event => {
    this.setState({
      file: event.target.files[0],
      reload: "1"
    });
  };

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  setValue(e, data) {
    this.setState({ value: data.value });
  }
  setGender(e, data) {
    this.setState({ gender: data.value });
  }

  handleTags = event => {
    this.setState({ value: event.target.value });
  };

  // updateNumber = (e) => {
  //   const val = e.target.value;
  //   // If the current value passes the validity test then apply that to state
  //   if (e.target.validity.valid) this.setState({message: e.target.value});
  //   // If the current val is just the negation sign, or it's been provided an empty string,
  //   // then apply that value to state - we still have to validate this input before processing
  //   // it to some other component or data structure, but it frees up our input the way a user
  //   // would expect to interact with this component
  //   else if (val === '' || val === '-') this.setState({message: val});
  // }

  render() {
    const {
      option,
      value,
      tags,
      first_name,
      last_name,
      phone_number,
      gender
    } = this.state;
    const option_gender = [
      { text: "Laki-laki", value: "Laki-laki" },
      { text: "Perempuan", value: "Perempuan" }
    ];
    return (
      <div >
        <Header as="h3" style={{color: "white"}} dividing>
          Profile Setting
        </Header>
        <Container>
          <Divider hidden />
          <Grid verticalAlign="middle" columns={2}>
            <GridColumn>
              <Image
                size="small"
                src={
                  "http://localhost:3000/src/web-api/public/avatar/" +
                  this.state.avatar
                }
                circular
              />
            </GridColumn>
            <GridColumn>
              <Form>
                <Form.Field>
                  <label style={{ textAlign: "center", color: "white" }}>Your Avatar</label>
                  <div className="input-file-container">
                    <input
                      className="input-file"
                      id="my-file"
                      type="file"
                      onChange={this.fileHandler}
                    />
                    <label
                      htmlFor="my-file"
                      className="input-file-trigger"
                      style={{ textAlign: "center", color: "#555" }}
                    >
                      Choose Picture
                    </label>
                    <br />
                    <br />
                    <br />
                  </div>
                  <p className="file-return" />
                </Form.Field>
              </Form>
            </GridColumn>
          </Grid>
          <Divider hidden />
          <Form>
            <Form.Field>
              <label style={{color: "white"}}>First Name</label>
              <input
                placeholder="first name"
                name="first_name"
                defaultValue={first_name}
                onChange={this.handlePost.bind(this)}
              />
              <Divider hidden />
              <label style={{color: "white"}}>Last Name</label>
              <input
                placeholder="last name"
                name="last_name"
                defaultValue={last_name}
                onChange={this.handlePost.bind(this)}
              />
              <Divider hidden />
              <label style={{color: "white"}}>Phone Number</label>
              <input
                type="number" 
                pattern="[0-9]*" 
                placeholder="0811xxxxx"
                name="phone_number"
                defaultValue={phone_number}
                onChange={this.handlePost.bind(this)}
              />
            <Divider hidden />
            <label style={{color: "white"}}>Gender</label>
            <Dropdown
              placeholder="Gender"
              style={{ position: "relative", display: "block" }}
              onChange={this.setGender.bind(this)}
              options={option_gender}
              fluid
              selection
              value={gender}
            />
            <Divider hidden />
            <label style={{color: "white"}}>Choosen Tags :</label>
            <br />

            <b style={{color: "white"}}><i>{tags}</i></b>
            <Divider hidden />
            <Dropdown
              placeholder="tags"
              style={{ position: "relative", display: "block" }}
              onChange={this.setValue.bind(this)}
              fluid
              multiple
              selection
              options={option}
              value={value}
            />
            <Divider hidden />
            <Modal
              trigger={
                <Button
                  fluid
                  icon="checkmark"
                  labelPosition="right"
                  content="Update Profile"
                  style={{backround: "white", color: "#555"}}
                  onClick={this.update.bind(this)}
                />
              }
              open={this.state.modalOpenNotification}
              onClose={this.handleCloseNotification}
              basic
              size="small"
              >
              {this.state.kode === 1 ? <Header style={{ textAlign: "center" }} content="No Updated !" /> : <Header style={{ textAlign: "center" }} content="Account Updated !" />}
            </Modal>
            </Form.Field>
          </Form>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
        </Container>
        <Divider hidden />
        <Divider hidden />
      </div>
    );
  }
}
