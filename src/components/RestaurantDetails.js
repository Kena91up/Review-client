import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config";
import { Images, StarFill, ArrowUpRight } from "react-bootstrap-icons";
import AddReview from "./AddReview";
import ReviewList from "./ReviewList";
import Map from "./Map";
class RestaurantDetails extends Component {
  state = {
    restaurantDetails: null,
  };
  componentDidMount() {
    let restaurantId = this.props.match.params.restaurantId;
    axios
      .get(`${config.API_URL}/api/businesses/${restaurantId}`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          restaurantDetails: response.data,
        });
      })
      .catch((err) => {
        console.log("Detail fetch failed");
      });
  }
  render() {
    const { restaurantDetails } = this.state;
    let restaurantId = this.props.match.params.restaurantId;
    if (!restaurantDetails) {
      return (
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <div>
        <div className="alert alert-primary font-italic" role="alert">
          Back to Restaurants  
          <Link to="/businesses" className="alert-link">
            click here
          </Link>
        </div>

        <div className="container">
          <h1 className="mt-0"> {restaurantDetails.name} </h1>
          <div className="slider-wrap">
            <section className="auto-slider slider-left">
              <div id="slider">
                <figure>
                  <img
                    className=" border-dark rounded "
                    src={restaurantDetails.image_url}
                  />
                  {restaurantDetails.photos.slice(1, 3).map((photo) => {
                    return <img className=" border-dark rounded" src={photo} />;
                  })}
                </figure>
                <div className="indicator"></div>
              </div>
            </section>
            <section className="slider-right">
              <div className="slide-top">Category: {restaurantDetails.categories[0].title}</div>
              <div className="slider-topic" >Price: {restaurantDetails.price} </div>
              <div  className="slider-topic">
                Rating: {restaurantDetails.rating}
                <StarFill height="10px" color="blue" />
              </div>
              <div  className="slider-topic">
                <img className="iconimage" src="/images/address.png" alt="" />
                {restaurantDetails.location.city} |
                {restaurantDetails.location.address1}
              </div>
              <div  className="slider-topic">
                <img className="iconimage" src="/images/phone.png" att="" />
                {restaurantDetails.phone}
              </div>
              <div  className="slider-topic"> <a href={restaurantDetails.url}>
                <img className="iconimage" src="/images/website.png" atl="" />
                Visit here
                <ArrowUpRight height="10px" />
              </a>
              </div>
              <div className="slider-topic"> 
                    <Link to={`/businesses/${restaurantId}/add-review`}>Write a review </Link>
              </div>
            </section>
          </div>
          <div className="map">
          <Map location={restaurantDetails} /></div>
          <div className="review">
          <ReviewList restaurantId={restaurantId}/></div>
        </div>
      </div>
    );
  }
}
export default RestaurantDetails;
