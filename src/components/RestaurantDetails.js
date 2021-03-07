import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import {StarFill} from "react-bootstrap-icons";

class RestaurantDetails extends Component {

    state = {
        restaurantDetails: {}
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
        return (
            <div>
            <div> Name of the restaurant: {restaurantDetails.name} </div>
            <img style = {{width: '500px', height: '600px'}} src= {restaurantDetails.image_url} /> 
            {/* <div> Address: {restaurantDetails.location.[1]} </div> */}
            <div> Telephone number: {restaurantDetails.phone}</div>
            <div> Price range: {restaurantDetails.price}</div>
            <div> Rating: {restaurantDetails.rating} <StarFill height="10px" color="blue"/></div>
            <a href = {restaurantDetails.url}> Website </a>
            </div>
        )
    }
}

export default RestaurantDetails