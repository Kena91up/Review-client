import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { render } from "react-dom";
import axios from "axios";
import config from "./config";
import "./index.css";
import MyNav from "./components/MyNav.jsx";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import RestaurantsList from "./components/RestaurantsList";
import AddReview from "./components/AddReview";
import Profile from "./components/Profile";
import RestaurantDetails from "./components/RestaurantDetails";

class App extends Component {
  state = {
    restaurants: [],
    loggedInUser: null,
    error: null,
    reviews: [],
    filteredProfile:[],
    user:[]
  };

  // All the initial data that display to the user is fetched here
  componentDidMount(){
    axios.get(`${config.API_URL}/api/user`)
      .then((response) => {
        this.setState({
          user: response.data
        })
      })
      .catch(() => {
        console.log('Detail fecth failed')
      })
      if (!this.state.loggedInUser) {
        axios.get(`${config.API_URL}/api/user`, {withCredentials: true})
          .then((response) => {
              this.setState({
                loggedInUser: response.data
              })
          })
          .catch(() => {
  
          })
      }  
  }

  handleSubmitProfile = (event) => {
    event.preventDefault()
    let country = event.target.country.value
    let favirote = event.target.favirote.value
    let profileimage = event.target.profileimage.files[0]
    
    let uploadForm = new FormData()
    uploadForm.append('imageUrl', image)

    // send image to cloudinary
    axios.post(`${config.API_URL}/api/user/upload`, uploadForm)
      .then((response) => {
            //1. Make an API call to the server side Route to create a new todo
          axios.post(`${config.API_URL}/api/edit`, {
            country: country,
            favirote: favirote,
            profileimage: response.data.profileimage
          })
            .then((response) => {
                // 2. Once the server has successfully created a new todo, update your state that is visible to the user
                this.setState({
                  user: [response.data, ...this.state.user]
                }, () => {
                  //3. Once the state is update, redirect the user to the home page
                  this.props.history.push('/')
                })

            })
            .catch((err) => {
              console.log('Create failed', err)
            })
      })
      .catch(() => {

      })

    
 }


 handleDelete = (id) => {

  //1. Make an API call to the server side Route to delete that specific todo
    axios.delete(`${config.API_URL}/api/user/${id}`)
      .then(() => {
         // 2. Once the server has successfully created a new todo, update your state that is visible to the user
          let filteredProfile = this.state.user.filter((user) => {
            return user._id !== id
          })

          this.setState({
            todos: filteredProfile
          }, () => {
            this.props.history.push('/')
          })
      })
      .catch((err) => {
        console.log('Delete failed', err)
      })

 }


  handleSignUp = (event) => {
    event.preventDefault();
    let user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(`${config.API_URL}/api/signup`, user)
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push("/signin");
          }
        );
      })
      .catch((err) => {
        this.setState({
          error: err.response.data
        });
      });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    let user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(`${config.API_URL}/api/signin`, user, { withCredentials: true })
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push("/businesses");
          }
        );
      })
      .catch((err) => {
        this.setState({
          error: err.response.data
        });
      });
  };

  handleLogout = (event) => {
    axios
      .post(`${config.API_URL}/api/logout`, {}, { withCredentials: true })
      .then((response) => {
        this.setState(
          {
            loggedInUser: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  render() {
    const { loggedInUser, error } = this.state;
    return (
      <div className="App">
        <MyNav onLogout={this.handleLogout} user={loggedInUser} />
        <Switch>
          <Route
            path="/signin"
            render={(routeProps) => {
              return <SignIn error={error} onSignIn={this.handleSignIn} {...routeProps} />;
            }}
          />
          <Route
            path="/signup"
            render={(routeProps) => {
              return (
                <SignUp error={error} onSignUp={this.handleSignUp}{...routeProps}/>
              );
            }}
          />
          <Route exact path="/businesses" component={RestaurantsList} />
          <Route
            exact path="/businesses/:restaurantId/add-review"
            render={() => {
              return <AddReview onAdd={this.handleSubmit} />;
            }}
          />
             <Route path="/profile" render={() => {
                return <Profile onAdd={this.handleSubmitProfile} onDelete={this.handleDelete} />
            }} />
          <Route
            exact path="/businesses/:restaurantId"
            component={RestaurantDetails}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
