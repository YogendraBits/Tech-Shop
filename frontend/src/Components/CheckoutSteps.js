import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className="justify-content-center mb-4" style={{ borderBottom: '2px solid #007bff', borderTop: '2px solid #007bff', padding: '0.5rem 0', }}>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link style={{ color: step1 ? '#007bff' : '#6c757d', fontWeight: 'bold', position: 'relative' }}>
                            <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>{step1 ? '✔' : '1'}</span> Sign In
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ color: '#6c757d', position: 'relative' }}>
                        <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>1</span> Sign In
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link style={{ color: step2 ? '#007bff' : '#6c757d', fontWeight: 'bold', position: 'relative' }}>
                            <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>{step2 ? '✔' : '2'}</span> Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ color: '#6c757d', position: 'relative' }}>
                        <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>2</span> Shipping
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link style={{ color: step3 ? '#007bff' : '#6c757d', fontWeight: 'bold', position: 'relative' }}>
                            <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>{step3 ? '✔' : '3'}</span> Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ color: '#6c757d', position: 'relative' }}>
                        <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>3</span> Payment
                    </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link style={{ color: step4 ? '#007bff' : '#6c757d', fontWeight: 'bold', position: 'relative' }}>
                            <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>{step4 ? '✔' : '4'}</span> Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={{ color: '#6c757d', position: 'relative' }}>
                        <span style={{ display: 'inline-block', marginBottom: '0.5rem', transition: 'transform 0.3s' }}>4</span> Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutSteps;
