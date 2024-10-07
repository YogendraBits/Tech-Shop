import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Footer.css'; // Import the CSS file for additional styling

const Footer = () => {
    const names = ['Trupti', 'Gaurav', 'Ishank', 'Rahaf', 'Yogendra'];
    const [showNamesTile, setShowNamesTile] = useState(false);

    const toggleNamesTile = () => {
        setShowNamesTile(!showNamesTile);
    };

    return (
        <footer className="foot-footer-container">
            <Container>
                <Row>
                    <Col>
                        <p className="foot-footer-text">
                            <span className="foot-copy-text"> &copy; 2024 </span> 
                            <a 
                                href="https://github.com/YogendraBits/FSADProject" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="foot-footer-link">
                                Tech-Store
                            </a>
                            <Button variant="link" className="foot-heart-button" onClick={toggleNamesTile}>
                                ❤️
                            </Button>
                        </p>
                    </Col>
                </Row>
            </Container>
            {showNamesTile && (
                <div className="foot-name-tile">
                    <button onClick={toggleNamesTile} className="foot-close-button">×</button>
                    <h3 className="foot-heading">Meet the Team</h3>
                    {names.map((name, index) => (
                        <p key={index} className="foot-name">{name}</p>
                    ))}
                </div>
            )}
        </footer>
    );
};

export default Footer;
