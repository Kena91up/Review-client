import axios from "axios";
import React, { Component } from "react";
import config from "../config";
import { Link, Redirect } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";

class Profile extends Component {
  state = {
    loggedInUser: null,
  };
  componentDidMount() {
    let id = this.props.id;
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          loggedInUser: response.data,
        });
      })
      .catch(() => {
        console.log("Detail fecth failed");
      });
  }
  render() {
    const { loggedInUser } = this.state;
    const { onDelete } = this.props;

    if (!loggedInUser) {
      return (
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <div>
        <h1 className="font-weight-bold">
          {" "}
          Welcome to your Profile {loggedInUser.username} !
        </h1>
        <div className="media media1">
          <img src={loggedInUser.profileimage} className="img mr-3" alt="" />
          <div>
            <div className="mt-0">Name:{loggedInUser.username}</div>
            <div className="mt-0">Email:{loggedInUser.email} </div>
            <div className="mt-0">Country:{loggedInUser.country}</div>
            <div className="mt-0">
              Favorite Cuisine: {loggedInUser.favorite}
            </div>
          </div>
        </div>
        <h2 className="font-weight-bold"> Your reviews </h2>
        <div className="card-wrap">
          {loggedInUser.reviews.map((userReview) => {
            return (
              <div className="media card-deck card-deck1">
                 <div className="media-body media-body1 border card bg-light mb-3">
                  <h3 className="mt-0">
                    {userReview.restaurantName} at
                    {userReview.restaurantLocation}
                  </h3>
                  <h3 className="mt-0 font-italic">{userReview.title}</h3>
                  <h5 className="mt-0 font-italic">
                    {userReview.description}
                  </h5>
                  <h5 className="mt-0 font-italic">
                    {userReview.rating} <StarFill height="10px" color="green" />
                  </h5>
                  <img
                    src={userReview.image}
                    alt="profileImage"
                    className=" fimg border-dark rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Link to={`/user/${loggedInUser._id}`}>Update account </Link>
        <button
          onClick={() => {
            onDelete(loggedInUser._id);
          }}
        >
          Delete account
        </button>
      </div>
    );
  }
}
export default Profile;
