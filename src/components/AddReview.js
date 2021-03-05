import React, { Component } from "react";
import Rating from "react-rating";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

class AddReview extends Component {
  state = {
    ratingCategory: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let title = event.target.title.value;
    let description = event.target.description.value;
    let date = event.target.date.value;
    let image = event.target.image.value;
    this.props.onAdd({
        title,
        description,
        date,
        image,
        rating: this.state.ratingCategory
    }) 
  };

  render() {
    const { onAdd } = this.props;

    return (
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
    );
  }
}

export default AddReview;
