import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

class Header extends Component {
    render() {
        return (
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">React ROS Robot</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/Home">Home</Nav.Link>
                  {/* <Nav.Link href="/About">Link</Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
    }
}

export default Header;