import React, { Component } from "react";
import { Link,  } from "react-router-dom";
import axios from "axios";
import config from "../config";
import {Rating} from 'react-rating'
import Search from "./Search.js";
import SearchRate from './SearchRate.js'
import {StarFill, TruckFlatbed} from "react-bootstrap-icons";
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
    const { filteredBusinesses, loaded } = this.state;

   if (loaded ==  false){
    return <div class="spinner-grow text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
   }
    return (
      <div>
      <Link to='/profile'><button>Profile</button></Link>
        <h4 className="font-weight-bold">Restaurants in the best destinations</h4>
        <Search myChange={this.handleSearchFood} />
        <SearchRate mySubmit={this.handleSearchRate}/>
        {
          filteredBusinesses.map((singleBusiness) => {
          return (
              <div key = {singleBusiness.id}>
              <div className="media list">
              <img className="img mr-3" src = {singleBusiness.image_url} />
              <div>
              <div className="mt-0">Name: {singleBusiness.name} </div>
              <div className="mt-0">Location: {singleBusiness.location.city}, {singleBusiness.location.address1}</div>
              <div className="mt-0"> Cuisine: {singleBusiness.categories[0].title}</div>
              <div className="mt-0">{singleBusiness.terms}</div>
              <div className="mt-0">Rating: {singleBusiness.rating} <StarFill height='10px' color="blue"/> </div>
                    
                    <Link to={`/businesses/${singleBusiness.id}`}>
                    <div className="mt-0"> More details</div>
                    </Link>
                    </div>
                    </div>
                </div>
          );
        })}
        <Chat/>
      </div>
    );
  }
}
export default RestaurantsList;
