import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config'

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
              business: response.data
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
                businesses.map((singleBusiness,index) => {
                    return <div key={index}>
                    <Link to={`/businesses/${index+1}`}> {singleBusiness.name} </Link>
                    <img src={singleBusiness.image_url} alt="" />
                </div>
                  })
               
              }
              
             </div>
          )
    }
}
export default RestaurantsList