import React from "react";
import { Navbar, Nav } from "react-bootstrap";


function MyNav(props) {
  return (
      <Navbar bg="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <a href='/'>
          <img src="/images/newlogo.png" alt="logo" className="logo" />
          </a>
            {props.user ? (
              <button  onClick={props.onLogout}>Log Out</button> //onclick is event onLogout is eventlistner
            ) : (
              <>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
     
  );
}
export default MyNav;
