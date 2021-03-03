import React from 'react';
import { Link } from "react-router-dom";

function SignIn(props){
    return (
        <form onSubmit={props.onSignIn}>
            <div className="form-group">
                <label htmlFor="InputEmail">Email address</label>
                <input name="email" type="email" id="InputEmail"  />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password" id="InputPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
            <p>Don't have an account!<Link style={{ marginLeft: "10px" }} to="/signup">
              LogIn
            </Link></p>
        </form>
    )
}

export default SignIn