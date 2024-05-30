import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
    const names = ['Trupti', 'Gaurav', 'Ishank', 'Rahaf', 'Yogendra'];
    const [showNamesTile, setShowNamesTile] = useState(false);

    const toggleNamesTile = () => {
        setShowNamesTile(!showNamesTile);
    };

    return (
        <footer style={{ backgroundColor: 'transparent', color: '#343a40', padding: '5px 0', textAlign: 'center', borderTop: '1px solid #000' }}>
            <Container>
                <Row>
                    <Col>
                        <p style={{ margin: '0', fontSize: '1rem' }}>
                            <span style={{ fontSize: '1.2rem' }}> Copyright © </span> 
                            <a href="https://github.com/YogendraBits/FSADProject" target="_blank" style={{ color: '#343a40', fontSize: '1.2rem' }} >FSAD-Shop</a>
                                <Button variant="link" style={{ color: 'red', textDecoration: 'none', fontSize: '1.8rem', paddingLeft: '10px', marginLeft: '10px' }} onClick={toggleNamesTile}>
                                ❤️
                            </Button>
                        </p>
                    </Col>
                </Row>
            </Container>
            {showNamesTile && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    color: '#333',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    textAlign: 'center',
                    maxWidth: '300px',
                    width: '90%',
                    margin: '0 auto'
                }}>
                    <button onClick={toggleNamesTile} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#333' }}>×</button>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#343a40' }}>Meet the Team</h3>
                    {names.map((name, index) => (
                        <p key={index} style={{ margin: '1rem 0', fontSize: '1rem', color: '#555' }}>{name}</p>
                    ))}
                </div>
            )}
        </footer>
    );
};

export default Footer;
