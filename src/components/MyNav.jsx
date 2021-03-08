import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNav(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        {
          props.user ? (
            <button onClick= {props.onLogout} >Log Out</button> //onclick is event onLogout is eventlistner
          ) : (
        <>
          <button>
            <Link style={{ marginLeft: "10px" }} to="/signin">
              Log In
            </Link>
          </button>
          <button>
            <Link style={{ marginLeft: "10px" }} to="/signup">
              Create an account
            </Link>
          </button>
          </>
          )
        }
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default MyNav;
