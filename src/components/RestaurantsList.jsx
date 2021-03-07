import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config'
import {StarFill} from "react-bootstrap-icons";

 class RestaurantsList extends Component {
    state = {
        businesses:[]
      }

      componentDidMount() {
        //let id = this.props.match.params.businessid;
        axios.get(`${config.API_URL}/api/businesses`)
           .then((response) => {
             console.log(response.data)
            this.setState({
              businesses: response.data.businesses
            });
          })
          .catch((err) => {
            console.log('err featching data',err);
          });
      }
    render() {
        const {businesses} = this.state
        return (
            <div>
              <h4>Restaurants</h4>
              {
                businesses.map((singleBusiness) => {
                    return (
                      <div key = {singleBusiness.id}>
                      <Link to={`/businesses/${singleBusiness.id}`}>
                      <h3> {singleBusiness.name} </h3>
                      </Link>
                      <h4> {singleBusiness.location.city}, {singleBusiness.location.address1}</h4>
                      <h5> Rating: {singleBusiness.rating} <StarFill height="10px" color="blue"/> </h5>
                    <img style = {{width: '300px'}} src = {singleBusiness.image_url} />
                </div>
                    );
                  })
              }
              
             </div>
          )
    }
}
export default RestaurantsList