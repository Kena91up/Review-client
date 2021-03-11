import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  render() {
    return (
      <div>
        <input
          onChange={this.props.mySubmit}
          type="number"
          placeholder="Search by Rating"
        />
      </div>
    );
  }
}
export default Search;
