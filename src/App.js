import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import AddReview from "./components/AddReview";
import axios from "axios";
import { render } from "react-dom";
import config from "./config";

class App extends Component {
  state = {
    restaurants: [],
    loggedInUser: null,
    error: null,
    reviews: [],
  };

  handleSubmit = (data) => {
    
    axios.post(`${config.API_URL}/api/add-review`, 
        data
      )

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
    return (
      <div className="App">
        <Switch>
          <Route
            path="/add-review"
            render={() => {
              return <AddReview onAdd={this.handleSubmit} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
