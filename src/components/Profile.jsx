import axios from 'axios'
import React, { Component } from 'react'
import config from '../config'
import {Link} from 'react-router-dom'

class Profile extends Component {
  state = {
    user: {},
  };

  componentDidMount(){
    let id = this.props.id
    axios.get(`${config.API_URL}/api/user/${id}`)
      .then((response) => {
        this.setState({
          user: response.data
        })
      })
      .catch(() => {
        console.log('Detail fecth failed')
      })
    }

  render() {
      const {user} = this.state
      const {onDelete} = this.props
    return (
      <div>
        <h4> Welcome to your Profile</h4>
        <div>{this.username}</div>
        <form onSubmit={this.props.onAdd}>
          <input name="country" type="text" placeholder="Enter country" />
          <input name="favirote" type="text" placeholder="Your faviote cuisine" />
          <input name="profileimage" type="file" />
          <button type="submit">Done</button>
        </form>
        <button onClick={() => { onDelete(user._id)  } } >Delete</button>
      </div>
    );
  }
}
export default Profile;
