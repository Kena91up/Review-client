import axios from "axios";
import React, { Component } from "react";
import config from "../config";
import { Link , Redirect} from "react-router-dom";

class Profile extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    let id = this.props.id;
    axios
      .get(`${config.API_URL}/api/user`)
      .then((response) => {
        this.setState({
            users: response.data,
        });
      })
      .catch(() => {
        console.log("Detail fecth failed");
      });
  }

  render() {
    const { users } = this.state;
    const { onDelete, loggedInUser } = this.props;

    if (!loggedInUser) {
        return <Redirect to={'/signin'} />
    }
    return (
      <div>
        <h4> Welcome to your Profile {loggedInUser.username} !</h4>
          <div>Name:{loggedInUser.username}</div>
          <div>Email:{loggedInUser.email} </div>
          <div>Country:{loggedInUser.country}</div>
          <div>Favorite Cuisine {loggedInUser.favorite}</div>
          <img src={loggedInUser.profileimage} alt='' class="img" />
         <Link to={`/user/${loggedInUser._id}`}>Update account </Link> 
          <button
          onClick={() => {
            onDelete(loggedInUser._id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default Profile;
