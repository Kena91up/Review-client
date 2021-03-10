import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import {Images, StarFill, ArrowUpRight} from "react-bootstrap-icons";
import AddReview from './AddReview';
import ReviewList from './ReviewList';
import Map from './Map';

class RestaurantDetails extends Component {

    state = {
        restaurantDetails: null
    }

    componentDidMount() {
        let restaurantId = this.props.match.params.restaurantId
        axios.get(`${config.API_URL}/api/businesses/${restaurantId}`, {withCredentials: true})
        .then((response) => {
            this.setState({
                restaurantDetails: response.data})
        })
        .catch((err) => {
            console.log('Detail fetch failed')
        })
    }
    render() {
        const {restaurantDetails} = this.state
        let restaurantId = this.props.match.params.restaurantId
        if (!restaurantDetails){
            <div class="dot-carousel"></div>
            return "Loading..."
        }
        return (
            <div>
             <Link to="/businesses">Back to Restaurants</Link>
            <div> Name of the restaurant: {restaurantDetails.name} </div>
            <img class="img" src= {restaurantDetails.image_url} /> 
            {
                restaurantDetails.photos.slice(1,3).map((photo) =>{
                    return <img class="img" src= {photo} /> 
                })
            }
            <div> Category: {restaurantDetails.categories[0].title}</div>
            <div> Location: {restaurantDetails.location.city} | {restaurantDetails.location.address1}</div>
            <div> Price range: {restaurantDetails.price}</div>
            <div> Rating: {restaurantDetails.rating} <StarFill height="10px" color="blue"/></div>
            <div> Telephone number: {restaurantDetails.phone}</div>
            <a href ={restaurantDetails.url}> Website<ArrowUpRight height="10px"/></a>
            <Link to={`/businesses/${restaurantId}/add-review`}>
            <div> Write a review </div>
            </Link>
            <ReviewList restaurantId={restaurantId}/>
            <Map location={restaurantDetails}/>
            </div>
        )
    }
}

export default RestaurantDetails