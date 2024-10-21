import React, { useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from './SearchBox';
import Chat from './gemini'; // Regular Chat component
import GroqChat from './GroqChat'; // Groq Chat component
import AIChatOptions from './AIChatOptions'; // AI chat options component
import './Header.css'; // Import the CSS file for additional styling

const Header = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedChatType, setSelectedChatType] = useState(null); // State to track selected chat type
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleLogout = () => {
        dispatch(logout());
        setShowLogoutModal(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleAIButtonClick = () => {
        setSelectedChatType('regular'); // Set default chat type when AI button is clicked
    };

    const handleSelectChatType = (type) => {
        setSelectedChatType(type);
    };

    const handleCloseChat = () => {
        setSelectedChatType(null); // Reset selected chat type
    };

    return (
        <header className="header-container">
            <Navbar expand="lg" className="header-navbar">
                <Container>
                    <LinkContainer to="/" className="header-brand-container">
                        <Navbar.Brand className="header-brand-name">Home</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <div className="header-search-box-container">
                            <SearchBox />
                        </div>
                        <Nav className="header-nav-links">
                            <LinkContainer to="/cart">
                                <Nav.Link className="header-nav-link">
                                    <i className="fas fa-shopping-cart"></i>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/wishlist">
                                <Nav.Link className="header-nav-link">
                                    <i className="fas fa-heart"></i>
                                </Nav.Link>
                            </LinkContainer>
                            <Nav.Link onClick={handleAIButtonClick} className="header-nav-link">
                                <i className="fas fa-microchip"></i>
                                <span> AI</span>
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={<span className="header-user-name">{userInfo.name}</span>} id="user-dropdown">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/address">
                                        <NavDropdown.Item>Address</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={() => setShowLogoutModal(true)}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="header-nav-link">
                                        <i className="fas fa-user"></i>
                                        <span> Sign In</span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="admin-dropdown">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/dashboard">
                                        <NavDropdown.Item>Api Log Dashboard</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* AI Chat Options and Chat Window */}
            {selectedChatType !== null && (
                <div className="header-chat-popup">
                    <AIChatOptions onSelect={handleSelectChatType} onClose={handleCloseChat} />
                    <div className="header-chat-content">
                        {selectedChatType === 'regular' ? <Chat /> : <GroqChat />}
                    </div>
                </div>
            )}

            <Modal show={showLogoutModal} onHide={handleCancelLogout} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to log out?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </header>
    );
};

export default Header;
