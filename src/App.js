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
import AddUserDetails from "./components/AddUserDetails";
import RestaurantDetails from "./components/RestaurantDetails";

class App extends Component {
  state = {
    restaurants: [],
    loggedInUser: null,
    error: null,
    reviews: [],
    filteredProfile: [],
    user: [],
    showForm: false,
    fetching: true,
  };

  // All the initial data that display to the user is fetched here
  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data,
          fetching: false,
        });
      })
      .catch(() => {
        console.log("Detail fecth failed");
        this.setState({
          fetching: false,
        });
      });
    if (!this.state.loggedInUser) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          this.setState({
            loggedInUser: response.data,
          });
        })
        .catch(() => {});
    }
  }

  handleSubmitProfile = (event) => {
    event.preventDefault();
    let country = event.target.country.value;
    let favorite = event.target.favorite.value;
    let profileimage = event.target.profileimage.files[0];

    let uploadForm = new FormData();
    uploadForm.append("imageUrl", profileimage);

    axios
      .post(`${config.API_URL}/api/upload`, uploadForm)
      .then((response) => {
        axios
          .patch(
            `${config.API_URL}/api/user`,
            { country, favorite, profileimage: response.data.image },
            { withCredentials: true }
          )
          .then((response) => {
            this.setState(
              {
                loggedInUser: response.data,
              },
              () => {
                this.props.history.push("/profile");
              }
            );
          });
      })
      .catch((err) => {
        console.log("Update failed", err);
      });
  };

  handleDelete = (id) => {
    //1. Make an API call to the server side Route to delete that specific todo
    axios
      .delete(`${config.API_URL}/api/user/${id}`)
      .then(() => {
        let filteredProfile = this.state.user.filter((user) => {
          return user._id !== id;
        });

        this.setState(
          {
            user: filteredProfile,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log("Delete failed", err);
      });
  };

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
          error: err.response.data,
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
          error: err.response.data,
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
    const { loggedInUser, error, fetching } = this.state;

   if(fetching){
     return<p>Loading App.js</p>
   }

    return (
      <div className="App">
        <MyNav onLogout={this.handleLogout} user={loggedInUser} />
        <Switch>
          <Route
            path="/signin"
            render={(routeProps) => {
              return (
                <SignIn
                  error={error}
                  onSignIn={this.handleSignIn}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/signup"
            render={(routeProps) => {
              return (
                <SignUp
                  error={error}
                  onSignUp={this.handleSignUp}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/profile"
            render={(routeProps) => {
              return <Profile {...routeProps} />;
            }}
          />
          <Route exact path="/businesses" component={RestaurantsList} />
          <Route
            exact
            path="/businesses/:restaurantId/add-review"
            render={() => {
              return <AddReview onAdd={this.handleSubmit} />;
            }}
          />
          <Route
            path="/user"
            render={(routeProps) => {
              return (
                <AddUserDetails
                  onAdd={this.handleSubmitProfile}
                  onDelete={this.handleDelete}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            exact
            path="/businesses/:restaurantId"
            component={RestaurantDetails}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
