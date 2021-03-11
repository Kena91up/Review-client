import React, { Component } from "react";

class AddUserDetails extends Component {
  state = {
    complete: false,
  };
  render() {
    return (
      <div>
        {this.state.complete ? <h4>Update your Profile </h4> : null}
        <div>{this.username}</div>
        <form onSubmit={this.props.onAdd}>
          <input name="country" type="text" placeholder="Enter country" />
          <input
            name="favorite"
            type="text"
            placeholder="Your favorite cuisine"
          />
          <input name="profileimage" type="file" />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    );
  }
}
export default AddUserDetails;
