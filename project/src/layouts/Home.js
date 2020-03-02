import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css'; 
import logo from './images/logo2.png'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  withRouter,
  Redirect,
  MemoryRouter
} from 'react-router-dom';
import './App.css';
import { MyConsumer, MyProvider } from '../Context';

//import { push } from 'connected-react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      //isLogedin: false,

      user: '',
      userData: '',
      user_token: '',
      token: '',
      researcher_id: '',

      id: '',
      error: '',

    };



    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.getGlobal = this.getGlobal.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }



  //getGlobal = event => {
  //var Global = require('react-global');

  //<Global values={{
  // globalToken: this.props.user_token,
  //}} />
  // }



  handleSubmit(event) {
    event.preventDefault()

    axios
      .post("https://soc-web-liv-60.napier.ac.uk/API/public/api/account/login",
        {
          email: this.state.email,
          password: this.state.password

        })
      /* .then(response => response.json())
       .then(json => {
         window.const = json.list;
         console.log(window.const) */

      .then((response) => {

        console.log(response);

        this.state.user = response.data;
        //window.responseDetails = response.data;
        //console.log(window.responseDetails);

        //this.setState({ Redirect: true });
        console.log(this.state.user);

        this.setState({
          userData: this.state.user
        });


        // ---STORING USER ID---
        this.state.id = this.state.userData.map(
          mUserData => mUserData.id);

        console.log('ID: ' + this.state.id);


        // ---STORING USER ERROR---
        this.state.error = this.state.userData.map(
          mUserData => mUserData.error);

        console.log('ERROR: ' + this.state.error);

        // ---STORING USER TOKEN
        this.state.token = this.state.userData.map(
          mUserData => mUserData.token);

        console.log('TOKEN: ' + this.state.token);

        const { local_token } = this.state.token;
        localStorage.setItem('token', local_token);
        var local = localStorage.getItem('token')
        console.log(local)


        // this.setState({
        // user_token: this.state.token,         
        //})


        /*
        window.id = window.responseDetails.map(
          mID => mID.id
        )
        console.log('ID is: ' + window.id);

        window.token = window.responseDetails.map(
          mToken => mToken.token
        )
        console.log('TOKEN is: ' + window.token);

        window.error = window.responseDetails.map(
          mError => mError.error
        )
        console.log('ERROR is: ' + window.error);

        */

        //MyProvider.state.id = this.state.id
        // console.log(this.state.id.toString());





        if (this.state.error == 'false') {
          this.setState({ Redirect: true });
          //alert(this.state.userToken);
          /* return (
             <MyConsumer>
               {({ updateID }) => (
                 //this.state.id = updateID(event.target.state.id)
                 updateID(this.state.id)
               )}
 
               {({ id }) => console.log(id)}
             </MyConsumer> 
           ) */

        }
        else {
          alert("Wrong login details")
        }

      },
        (error) => {
          console.log("Login error ", error);
        })
      .catch(function (error) {
        console.log(error);
      })

  }



  render() {

    //const global_token_data = window.global_token_data;
    //window.token_data = this.state.user_token;
    //window.researcher_id = this.state.id;
    //window.A_responseData = window.responseDetails 
    //window.A_id = window.id
    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/AdminPanel',
        }} />)
    }
    return (
      <MyProvider>
        <div>
          {({ id }) => <div><h1>Welcome {id}</h1></div>}}

        <div className='TextCenter'>
            <img src={logo} />

            <form onSubmit={this.handleSubmit}
              mUserToken={this.state.user_token}>

              <h1 className='primary'>Q-METHODOLOGY</h1>

              <div>

                <div className='column'>

                  <input className='space textbox'
                    type="email"
                    name="email"
                    placeholder="Email"
                    email={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div>

                  <input className='space textbox'
                    type="password"
                    name="password"
                    placeholder="Password"
                    password={this.state.password}
                    onChange={this.handleChange}
                    required
                  />

                </div>

                <div className='buttonContainer'>

                  <button
                    type="submit"
                    className='space button button3'>
                    Login
                </button>

                  <Link to={'/RegForm'}>
                    <button
                      type="submit"
                      className='space button button3'>
                      Register
                  </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        }
      </MyProvider>

    )
  }
}



