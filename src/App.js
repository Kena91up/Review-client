import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios'
import config from './config'
import './index.css'
import MyNav from './components/MyNav.jsx'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import RestaurantsList from './components/RestaurantsList';

class App extends Component{

  state = {
    restaurants: [],
    loggedInUser: null,
    error: null,
    reviews: []

  }


  handleSignUp = (event) => {
    event.preventDefault()
    let user ={
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    } 

    axios.post(`${config.API_URL}/api/signup`, user)
    .then((response) => {
      this.setState({
      loggedInUser: response.data
      }, () => {
      this.props.history.push('/')
    })
  })
  .catch((err) => {
    this.setState({
     error: err.response.data
    })
})
 }

 handleSignIn = (event) => {
  event.preventDefault()
  let user = {
    email: event.target.email.value,
    password: event.target.password.value
  } 

  axios.post(`${config.API_URL}/api/signin`, user,{withCredentials: true})
    .then((response) => {
        this.setState({
          loggedInUser: response.data
        }, () => {
          this.props.history.push('/')
        })
    })
    .catch((err) => {
        console.log('Something went wrong', err)
    })
 }

 handleLogout = (event) => {
   axios.post(`${config.API_URL}/api/logout`, {},{withCredentials: true})
    .then((response) => {
        this.setState({
          loggedInUser: null
        }, () => {
          this.props.history.push('/')
        })
    })
    .catch((err) => {
        console.log('Something went wrong', err)
    })
 }
  render(){
    const { loggedInUser, error} = this.state
  return (
   
    <div className="App">
    <MyNav onLogout={this.handleLogout} user={loggedInUser} />
      <Switch>
      <Route path="/signin" render={(routeProps) => {
              return  <SignIn onSignIn={this.handleSignIn} {...routeProps}  />
            }}/>
            <Route path="/signup" render={(routeProps) => {
	             return  <SignUp error={error} onSignUp={this.handleSignUp} {...routeProps}  />
            }}/>
            <Route path="/businesses" component={RestaurantsList}/>
      </Switch>
    </div>
  );
}
}

export default  withRouter(App)
