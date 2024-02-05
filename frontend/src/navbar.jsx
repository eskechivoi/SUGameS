import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

function NavbarSugus(props) {
    return(
        <Navbar bg="light" expand="lg" style={{paddingInlineStart: 20, paddingInlineEnd: 20}}>
            <Navbar.Brand href="#!">SUGameS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#!">Home</Nav.Link>
                    <Nav.Link href="#!">About</Nav.Link>
                    <NavDropdown title="Shop" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#!">All Products</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#!">Popular Items</NavDropdown.Item>
                        <NavDropdown.Item href="#!">New Arrivals</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form>
                    <Button variant="outline-dark" type="submit" onClick={(event) => props.onHandleClick(event)}>
                        <i className="bi-cart-fill me-1"></i>
                        Carrito
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{props.numItems}</span>
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarSugus;