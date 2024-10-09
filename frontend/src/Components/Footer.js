import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // New CSS styling

const Footer = () => {
    return (
        <footer className="new-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h1>Tech-Store</h1>
                    <p>Your one-stop tech shop</p>
                </div>
                <div className="footer-links">
                    <a href="#about">About Us</a>
                    <a href="#support">Support</a>
                    <a href="#careers">Careers</a>
                    <a href="#contact">Contact</a>
                </div>
                <div className="footer-social">
                    <h5>Follow Us</h5>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Tech-Store. All rights reserved.</p>
                </div>
            </div>
            
        </footer>

    );
};

export default Footer;
