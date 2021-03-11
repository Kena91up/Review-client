import axios from "axios";
import React, { Component } from "react";
import config from "../config";
import { Link, Redirect } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";

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
      return <Spinner />
  }
    return (
      <div>
        <h4> Welcome to your Profile {loggedInUser.username} !</h4>
          <div>Name:{loggedInUser.username}</div>
          <div>Email:{loggedInUser.email} </div>
          <div>Country:{loggedInUser.country}</div>
          <div>Favorite Cuisine: {loggedInUser.favorite}</div>
          <img src={loggedInUser.profileimage} className="img" alt=''/>
          <div> Your reviews </div>
          {
            loggedInUser.reviews.map((userReview) => {
              return <div> <section>
              <h3> {userReview.restaurantName} at {userReview.restaurantLocation}</h3>
              <h3>{userReview.title}</h3>
              <h5> {userReview.description}</h5>
              <h5> {userReview.rating} <StarFill height='10px' color="blue"/> </h5>
              <img src={userReview.image} alt = 'profileImage'/>
              </section>
              </div>
          })
          }
         <Link to={`/user/${loggedInUser._id}`}>Update account </Link> 
          <button
          onClick={() => {
            onDelete(loggedInUser._id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default Profile;
