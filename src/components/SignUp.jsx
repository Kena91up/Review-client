import React from 'react';
import { Link } from "react-router-dom";

function SignUp(props){
  
    return (
      <form onSubmit={props.onSignUp}>
            <div className="form-group">
                <label htmlFor="InputUsername">Username</label>
                <input name="username" type="text" id="InputUsername"  />
            </div>
            <div className="form-group">
                <label htmlFor="InputEmail">Email</label>
                <input name="email" type="email"  id="InputEmail"  />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password"  id="InputPassword" />
            </div>
            {
              props.error ? (
                <p style={{color :'red'}}>{props.error.errorMessage}</p>
              ) : null
            }
            <button type="submit" className="btn btn-primary">Create an account</button>

            <p>Already have an account!<Link style={{ marginLeft: "10px" }} to="/signin">
              LogIn
            </Link></p>
        </form>
    )
    }
export default SignUp