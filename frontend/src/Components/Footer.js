import React from 'react';
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
                    <a href="/AboutUs">About Us</a>
                </div>
                <div className="footer-social">
                    <h5>Follow Us</h5>
                    <div className="social-icons">
                    <a href="https://github.com/YogendraBits/Tech-Shop" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i className="fab fa-github"></i></a>
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
