import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const names = ['Trupti', 'Gaurav', 'Ishank', 'Rahaf', 'Yogendra'];
    const heartStyle = {
        color: 'red',
        cursor: 'pointer',
    };
    const tileStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#343a40',
        color: '#fff',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'none',
        zIndex: 1000,
        textAlign: 'center',
    };

    return (
        <footer style={{ backgroundColor: '#343a40', color: '#f8f9fa', padding: '2rem 0', textAlign: 'center' }}>
            <Container>
                <Row>
                    <Col>
                        <p style={{ margin: '0', fontSize: '1.5rem' }}>
                            Copyright &copy; SAP-Shop 
                            <span 
                                style={{ ...heartStyle, marginLeft: '0.5rem' }} 
                                onMouseEnter={() => document.getElementById('namesTile').style.display = 'block'}
                                onMouseLeave={() => document.getElementById('namesTile').style.display = 'none'}
                            >
                                ❤️
                            </span>
                        </p>
                    </Col>
                </Row>
            </Container>
            <div id="namesTile" style={tileStyle}>
                <h3 style={{ marginBottom: '1rem' }}>Meet the Team</h3>
                {names.map((name, index) => (
                    <p key={index} style={{ margin: '1rem 0', fontSize: '1.2rem' }}>{name}</p>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
