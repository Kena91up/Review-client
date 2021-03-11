import React from "react";
import { Link } from "react-router-dom";

function SignUp(props) {
  return (
    <div className="container">
      <form onSubmit={props.onSignUp} className="form-signup">
        <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
        <div className="row">
          <div className="col">
            <label htmlFor="InputUsername">Username</label>
            <input name="username" type="text" id="InputUsername" />
            <label htmlFor="InputEmail">Email</label>
            <input name="email" type="email" id="InputEmail" />
            <label htmlFor="InputPassword">Password</label>
            <input name="password" type="password" id="InputPassword" />
          </div>
        </div>
        {props.error ? (
          <p style={{ color: "green" }}>{props.error.errorMessage}</p>
        ) : null}
        <button type="submit" className="btn btn-primary">
          Create an account
        </button>

        <p>
          Already have an account?
          <Link style={{ marginLeft: "10px" }} to="/signin">
            LogIn
          </Link>
        </p>
      </form>
    </div>
  );
}
export default SignUp;
