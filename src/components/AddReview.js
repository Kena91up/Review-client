import React, { Component } from "react";
import Rating from "react-rating";
import { Star, StarFill, StarHalf, HeartFill } from "react-bootstrap-icons";
import axios from "axios";
import config from "../config";
import { withRouter } from "react-router-dom";

class AddReview extends Component {
  state = {
    ratingCategory: 0,
    complete: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let title = event.target.title.value;
    let description = event.target.description.value;
    let date = event.target.date.value;
    let image = event.target.image.files[0];
    let restaurantId = this.props.match.params.restaurantId;

    let uploadFormImage = new FormData();
    uploadFormImage.append("imageUrl", image);

    axios
      .post(`${config.API_URL}/api/upload`, uploadFormImage)
      .then((response) => {
        axios
          .post(`${config.API_URL}/api/add-review`, {
            image: response.data.image,
            title,
            description,
            date,
            rating: this.state.ratingCategory,
            restaurantId,
          },{withCredentials:true})

          .then((response) => {
            this.setState({
              reviews: response.data,
              complete: true,
            });
            setTimeout(() => {
              this.props.history.push(`/businesses/${restaurantId}`);
            }, 3000);
          });
      })
      .catch((err) => {
        console.log("adding review failed", err);
      });
  };

  render() {
    return (
      <div>
        {this.state.complete ? <h4>Thank you for your review!<HeartFill color="darkred" height='10px'/></h4> : null}
        <form onSubmit={this.handleSubmit}>
          <label> Title of your review </label>
          <input name="title" type="text" placeholder="Summarize your visit" />
          <label> Your review </label>
          <input
            name="description"
            type="text"
            placeholder="Describe your experience"
          />
          <label> Review date </label>
          <input type="date" name="date" />
          <label for="photo">
            {" "}
            Do you have photos to share? (only in jpg or png format)
          </label>
          <input type="file" name="image" autocomplete="off"></input>
          <label> Give a rating </label>
          <Rating
            name="rating"
            emptySymbol={<Star color="darkblue" />}
            fullSymbol={<StarFill color="blue" />}
            initialRating={this.state.ratingCategory}
            onClick={(value) => {
              this.setState({
                ratingCategory: value,
              });
            }}
          />
          <span> {this.state.ratingCategory}</span>
          <button type="submit"> Add a review </button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddReview);
