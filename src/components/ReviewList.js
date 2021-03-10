import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import {StarFill} from "react-bootstrap-icons";

class ReviewList extends Component {
    state= {
        reviews: [],
    };

    componentDidMount() {
        let restaurantId = this.props.restaurantId
    axios.get(`${config.API_URL}/api/reviews`, {
        withCredentials: true,
        params: {
            restaurantId: restaurantId
        }
    })
    .then((response) => {
        this.setState({
            reviews: response.data
          });
          console.log('Its passing through here')
    })
    .catch((err) => {
        console.log('Something went wrong', err)
    })
}
    render() {
        const {reviews} = this.state;
        const { loggedInUser , username} = this.props;
        
        return (
            <div>
            <h4> Reviews </h4>
        {
            reviews.map((singleReview) => {
                return (
                    <div>
                    <div> User: {singleReview.userId.username}  </div>
                    <img src={singleReview.userId.profileimage} alt="profileImage" />
                    <div> {singleReview.title} </div>
                    <div> {singleReview.description} </div>
                    <div> {singleReview.rating} <StarFill height='10px' color="blue"/> </div>
                    <img src={singleReview.image} alt={singleReview.title} class="img"/>
                    
                    </div>
                );
            })
        }
           
                
            </div>
        )
    }
}

export default ReviewList