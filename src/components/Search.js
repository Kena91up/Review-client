import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Search extends Component {

    render() {
        return (
            <div>
                <input onChange={this.props.myChange} type ="text" placeholder="Search food"/>
            </div>
        )
    }
}
export default Search