import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Search extends Component {

    render() {
        return (
            <div>
                <input onSubmit={this.props.mySubmit} type ="number" placeholder="Search by rating"/>
            </div>
        )
    }
}
export default Search