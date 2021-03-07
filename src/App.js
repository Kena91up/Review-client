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
import RestaurantDetails from "./components/RestaurantDetails";

class App extends Component {
  state = {
    restaurants: [],
    loggedInUser: null,
    error: null,
    reviews: [],
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
            this.props.history.push("/");
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
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log("Something went wrong", err);
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

  handleSubmit = (data) => {
    axios
      .post(`${config.API_URL}/api/add-review`, data)

      .then((response) => {
        this.setState(
          {
            reviews: [response.data, ...this.state.reviews],
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log("adding review failed", err);
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
              return <SignIn onSignIn={this.handleSignIn} {...routeProps} />;
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
          <Route path="/businesses" exact={true} component={RestaurantsList} />
          <Route
            path="/add-review"
            render={() => {
              return <AddReview onAdd={this.handleSubmit} />;
            }}
          />
          <Route
            path="/businesses/:restaurantId"
            component={RestaurantDetails}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
