import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNav(props) {
  return (
    <Navbar bg="light" expand="lg">
    <img src="/images/logo.png" alt="" class="logo"/>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        {
          props.user ? (
            <button onClick= {props.onLogout} >Log Out</button> //onclick is event onLogout is eventlistner
          ) : (
        <>
          <button>
            <Link to="/signin" class="button">
              Log In
            </Link>
          </button>
          <button>
            <Link to="/signup" class="button">
              Register
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
