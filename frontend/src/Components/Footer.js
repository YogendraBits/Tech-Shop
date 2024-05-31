import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
    const names = ['Trupti', 'Gaurav', 'Ishank', 'Rahaf', 'Yogendra'];
    const [showNamesTile, setShowNamesTile] = useState(false);

    const toggleNamesTile = () => {
        setShowNamesTile(!showNamesTile);
    };

    return (
        <footer style={{ backgroundColor: '#222', color: '#fff', padding: '20px 0', textAlign: 'center', borderTop: '2px solid #444' }}>
            <Container>
                <Row>
                    <Col>
                        <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.5' }}>
                            <span style={{ fontSize: '1.2rem' }}> Copyright © </span> 
                            <a href="https://github.com/YogendraBits/FSADProject" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfff', fontSize: '1.2rem', textDecoration: 'none' }}>FSAD-Shop</a>
                            <Button variant="link" style={{ color: '#ff1493', textDecoration: 'none', fontSize: '1.8rem', paddingLeft: '10px', marginLeft: '10px' }} onClick={toggleNamesTile}>
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
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '90%',
                    margin: '0 auto',
                    animation: 'fadeIn 0.3s'
                }}>
                    <button onClick={toggleNamesTile} style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '1.8rem',
                        color: '#ff1493'
                    }}>×</button>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem', fontWeight: 'bold', color: '#00bfff' }}>Meet the Team</h3>
                    {names.map((name, index) => (
                        <p key={index} style={{ margin: '1rem 0', fontSize: '1.2rem', color: '#ddd' }}>{name}</p>
                    ))}
                </div>
            )}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -45%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
