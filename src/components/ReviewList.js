import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { StarFill } from "react-bootstrap-icons";

class ReviewList extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    let restaurantId = this.props.restaurantId;
    axios
      .get(`${config.API_URL}/api/reviews`, {
        withCredentials: true,
        params: {
          restaurantId: restaurantId,
        },
      })
      .then((response) => {
        this.setState({
          reviews: response.data,
        });
        console.log("Its passing through here");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }
  render() {
    const { reviews } = this.state;
    const { loggedInUser, username } = this.props;

    return (
      <div class="media card-deck ">
        <h4> Reviews </h4>
        {reviews.map((singleReview) => {
          return (
            <div class="media-body border card bg-light mb-3">
              <img
                src={singleReview.userId.profileimage}
                alt="profileImage"
                class="img rounded-circle"
              />
              <h1 class="mt-0">{singleReview.userId.username}</h1>
              <h3 class="mt-0">{singleReview.title}</h3>
              <h5 class="mt-0">{singleReview.description}</h5>
              <h5>{singleReview.rating}<StarFill height="10px" color="green"/> </h5>
              <img
                src={singleReview.image}
                alt={singleReview.title}
                class="foodimg border-dark rounded"
              />
            </div>
          );
        })}
      </div>
    );
  }
}
export default ReviewList;
