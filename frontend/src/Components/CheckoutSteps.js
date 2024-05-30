import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCheckCircle } from 'react-icons/fa'; // Importing FaCheckCircle icon from react-icons/fa

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className="justify-content-center mb-4" style={{ borderBottom: '2px solid #007bff', borderTop: '2px solid #007bff', padding: '0.5rem 0' }}>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link className="checkout-step" style={{ color: '#007bff', fontWeight: 'bold' }}>
                            <FaCheckCircle className="step-icon" /> Sign In
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="checkout-step" style={{ color: '#6c757d' }}>
                        <span className="step-icon">1</span> Sign In
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link className="checkout-step" style={{ color: '#007bff', fontWeight: 'bold' }}>
                            <FaCheckCircle className="step-icon" /> Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="checkout-step" style={{ color: '#6c757d' }}>
                        <span className="step-icon">2</span> Shipping
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link className="checkout-step" style={{ color: '#007bff', fontWeight: 'bold' }}>
                            <FaCheckCircle className="step-icon" /> Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="checkout-step" style={{ color: '#6c757d' }}>
                        <span className="step-icon">3</span> Payment
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link className="checkout-step" style={{ color: '#007bff', fontWeight: 'bold' }}>
                            <FaCheckCircle className="step-icon" /> Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="checkout-step" style={{ color: '#6c757d' }}>
                        <span className="step-icon">4</span> Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutSteps;
