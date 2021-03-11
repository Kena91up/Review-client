import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div className="notfound-page">
        <div
          style={{
            backgroundImage: "url(/images/bench.png)",
            backgroundPosition: "top",
            height: "450px",
            backgroundSize: "cover",
            display: "block",
          }}
        >
          <div className="text-notFound">
            <h1 className="title-notFound">
              <b> 404 </b>
            </h1>
            <div className="sections">
              {" "}
              The page you are looking for does not exist. 
              <br></br>
              How you got here is a
              mystery.
            </div>
            <br></br>
            <div className= "sections">
              {" "}
              You can click on our logo at the left corner to go back to the
              homepage.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
