import React from "react";
import { Link } from "react-router-dom";

function SignIn(props) {
  return (
    <div className="container">
      <form onSubmit={props.onSignIn}>
        <h1 className="h3 mb-3 font-weight-normal">Please Log In</h1>
        <div className="row">
          <div className="col">
            <label htmlFor="InputEmail">Email address</label>
            <input name="email" type="email" id="InputEmail" />
            <label htmlFor="InputPassword">Password</label>
            <input name="password" type="password" id="InputPassword" />
            {props.error ? (
              <p style={{ color: "green" }}>{props.error.error}</p>
            ) : null}
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </div>
        <p>
          Don't have an account!
          <Link style={{ marginLeft: "10px" }} to="/signup">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
