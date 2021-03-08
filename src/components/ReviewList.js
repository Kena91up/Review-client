import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

class ReviewList extends Component {
    state= {
        reviews: [],
    };

    componentDidMount() {
        let restaurantId = this.props.restaurantId
    axios.get(`${config.API_URL}/api/reviews`, {
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
        const {reviews} = this.state
        
        return (
            <div>
            <h4> Reviews </h4>
        {
            reviews.map((singleReview) => {
                console.log(singleReview)
                return (
                    <div>
                    <div> {singleReview.title} </div>
                    <div> {singleReview.description} </div>
                    </div>
                );
            })
        }
           
                
            </div>
        )
    }
}

export default ReviewList