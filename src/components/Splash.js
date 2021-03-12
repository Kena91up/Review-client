import React from "react";
import { Link } from "react-router-dom";

function SplashComponent() {
  return (
    <div>
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
