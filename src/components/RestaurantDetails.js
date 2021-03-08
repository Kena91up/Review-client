import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import {Images, StarFill} from "react-bootstrap-icons";
import AddReview from './AddReview';
import ReviewList from './ReviewList';

class RestaurantDetails extends Component {

    state = {
        restaurantDetails: null
    }

    componentDidMount() {
        let restaurantId = this.props.match.params.restaurantId
        axios.get(`${config.API_URL}/api/businesses/${restaurantId}`)
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
            return "Loading"
        }
        return (
            <div>
             <Link to="/businesses">Back to Restaurants</Link>
            <div> Name of the restaurant: {restaurantDetails.name} </div>
            <img style = {{width: '350px', height: '450px'}} src= {restaurantDetails.image_url} /> 
            {
                restaurantDetails.photos.slice(1,3).map((photo) =>{
                    return <img style = {{width: '350px', height: '450px'}} src= {photo} /> 
                })
            }
            <div> Category: {restaurantDetails.categories[0].title}</div>
            <div> Location: {restaurantDetails.location.city} | {restaurantDetails.location.address1}</div>
            <div> Price range: {restaurantDetails.price}</div>
            <div> Rating: {restaurantDetails.rating} <StarFill height="10px" color="blue"/></div>
            <div> Telephone number: {restaurantDetails.phone}</div>
            <a href ={restaurantDetails.url}> Website </a>
            <Link to={`/businesses/${restaurantId}/add-review`}>
            <div> Write a review </div>
            </Link>
            <ReviewList restaurantId={restaurantId}/>
            </div>
        )
    }
}

export default RestaurantDetails