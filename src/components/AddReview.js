import React, { Component } from 'react'

state={
    curTime : new Date().toLocaleString(),
  }

class AddReview extends Component {
    render() {
        return (
            <form onSubmit = {this.props.onAdd}>
                <label> Title of your review </label>
                <input name = "title" type = "text" placeholder="Summarize your visit"/>
                <label> Your review </label>
                <input name = "descriptiton" type = "text" placeholder = "Describe your experience"/> 
                <p> Day of posting: {this.state.curTime}</p>
                <label for="photo"> Do you have photos to share? (only in jpg or png format)</label>
                <input type="file" name="image" autocomplete="off"></input>
      

            </form>
                
        )
    }
}

export default AddReview