import React from 'react';

import Logo from './Logo/Logo';
import MenuItems from './Menu/MenuItems';

// Bootstrap Navbar Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Container from 'react-bootstrap/Container';

const Navigation = ({data}) => {
    return ( 
        <header> 
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container className="portfolio-container">
                    <NavbarBrand href="/">
                        <Logo imageData={data.logo}/>
                    </NavbarBrand>
                    <NavbarToggle aria-controls="responsive-navbar-nav" />
                    <NavbarCollapse>
                        <Nav className="ms-auto">
                            <MenuItems />
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Navigation;    