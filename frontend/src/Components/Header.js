import React, { useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from './SearchBox';
import { withRouter } from 'react-router-dom';
import Chat from './chat'; // Import your Chat component
import './Header.css'; // Import the CSS file for additional styling

const Header = ({ history }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showChat, setShowChat] = useState(false); // State for chat visibility
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistitems } = wishlist;

    const handleLogout = () => {
        dispatch(logout());
        setShowLogoutModal(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <header className="he-header-container">
            <Navbar expand="lg" variant="dark" className="he-custom-navbar">
                <Container>
                    <LinkContainer to="/" className="he-brand-container">
                        <Navbar.Brand className="he-brand-name">Tech-Store</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <div className="he-search-box-container">
                            <SearchBox history={history} />
                        </div>
                        <Nav className="he-nav-links">
                            <LinkContainer to="/cart">
                                <Nav.Link className="he-nav-link">
                                    <span><i className="fas fa-shopping-cart"></i> Cart</span>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/wishlist">
                                <Nav.Link className="he-nav-link">
                                    <span>
                                        <i className="fas fa-heart"></i> Wishlist
                                        {wishlistitems.length > 0 && (
                                            <span className="he-wishlist-count">{wishlistitems.length}</span>
                                        )}
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                            <Nav.Link onClick={toggleChat} className="he-nav-link">
                                <span><i className="fas fa-comments"></i> Gemini</span>
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={<span className="he-user-name">{userInfo.name}</span>} id="user-dropdown">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={() => setShowLogoutModal(true)}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="he-nav-link">
                                        <span><i className="fas fa-user"></i> Sign In</span>
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
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Chat Popup */}
            {showChat && (
                <div className="chat-popup">
                    <Chat />
                    <button className="close-chat" onClick={toggleChat}>
                        &times; {/* Close icon */}
                    </button>
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

export default withRouter(Header);
