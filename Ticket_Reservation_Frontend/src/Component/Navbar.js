import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const [name, setName] = React.useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");

    if (name !== null || name !== undefined) {
      setName(name);
    }
  }, [name]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Train Go</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Book Now</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {name ? (
              <Nav>
                <NavDropdown title={name} id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/login">Contact Us</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
