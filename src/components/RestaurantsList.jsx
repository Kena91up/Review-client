import React, { Component } from "react";
import { Link,  } from "react-router-dom";
import axios from "axios";
import config from "../config";
import {Rating} from 'react-rating'
import Search from "./Search.js";
import SearchRate from './SearchRate.js'
import {StarFill} from "react-bootstrap-icons";
import Chat from './Chat.js'
import Profile from "./Profile";

class RestaurantsList extends Component {
  state = {
    businesses: [],
    filteredBusinesses: [],
    loaded: false,
  };

  componentDidMount() {
    axios
      .get(`${config.API_URL}/api/businesses`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          businesses: response.data.businesses,
          filteredBusinesses: response.data.businesses,
          loaded: true,
        });
      })
      .catch((err) => {
        console.log("err featching data", err);
      });
  }
  // search food
  handleSearchFood = (event) => {
    let searchFood = event.target.value.toLowerCase();
    let filteredFoodList = this.state.businesses.filter((food) => {
      return food.categories[0].title.toLowerCase().includes(searchFood);
    });
    this.setState({
      filteredBusinesses: filteredFoodList
    });
  };

  // search by rating
  handleSearchRate = (event) => {
    let searchRate = event.target.value;
    let filteredRateList = this.state.businesses.filter((food) => {
     console.log(searchRate)
     console.log(food.rating)
      return food.rating >= searchRate;
      
    });
    this.setState({
      filteredBusinesses: filteredRateList
    });
  };

 
render() {
    const { filteredBusinesses } = this.state;
   
    return (
      <div>
      <Link to='/profile'><button>Profile</button></Link>
        <h4>Restaurants</h4>
        <Search myChange={this.handleSearchFood} />
        <SearchRate mySubmit={this.handleSearchRate}/>
        {
          filteredBusinesses.map((singleBusiness) => {
          return (
              <div key = {singleBusiness.id}>
                      <h3>Name: {singleBusiness.name} </h3>
                      <h4>Location: {singleBusiness.location.city}, {singleBusiness.location.address1}</h4>
                      <h4> Cuisine: {singleBusiness.categories[0].title}</h4>
                      <h4>{singleBusiness.terms}</h4>
                      <h5> Rating: {singleBusiness.rating} <StarFill height='10px' color="blue"/> </h5>
                    <img class="img" src = {singleBusiness.image_url} />
                    <Link to={`/businesses/${singleBusiness.id}`}>
                    <h5> More details</h5>
                    </Link>
                </div>
          );
        })}
        <Chat/>
      </div>
    );
  }
}
export default RestaurantsList;
