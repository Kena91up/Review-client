import React from "react";
import { Link } from "react-router-dom";

function SplashComponent() {
  return (
    <div>
      <button>
        <Link to="/signin" className=" btn button">
          Log In
        </Link>
      </button>
      <button>
        <Link to="/signup" className="btn button">
          Register
        </Link>
      </button>
      <div
        className="splash-screen"
        style={{
          backgroundImage: `url(/images/rest5.jpg)`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          display: "block",
        }}
      >
      </div>
    </div>
  );
}

export default SplashComponent;
