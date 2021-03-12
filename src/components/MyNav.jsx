import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Form } from "react-bootstrap";

function MyNav(props) {
  const homepage = props.location.pathname === "/";
  const loggedIn = props.user;
  return (
    <Navbar bg="light" expand="lg" className="justify-content-between">
      <Navbar.Brand>
        <Link to="/">
          <img src="/images/newlogo.png" alt="logo" className="logo" />
        </Link>
      </Navbar.Brand>

      <Form inline>
        {homepage && !loggedIn ? (
          <>
            <button type="button">
              <Link to="/signin" className=" btn button">
                Log In
              </Link>
            </button>
            <button type="button">
              <Link to="/signup" className="btn button">
                Register
              </Link>
            </button>
          </>
        ) : null}
        { loggedIn? (
          <>
            <Link to="/profile">
              <button type="button">Profile</button>
            </Link>

            <button onClick={props.onLogout} type="button">Log Out</button>
          </>
        ) : (
          <></>
        )}
      </Form>
    </Navbar>
  );
}
export default withRouter(MyNav);
