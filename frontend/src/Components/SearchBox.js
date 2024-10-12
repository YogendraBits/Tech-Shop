import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate(); // Get navigate function

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`); // Use navigate for redirection
        } else {
            navigate('/'); // Navigate to home if keyword is empty
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <Row className="align-items-center justify-content-center no-gutters">
                <Col xs={8} sm={10} className="p-0">
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search...'
                        style={{
                            borderRadius: '30px 0 0 30px',
                            border: '2px solid #28a745',
                            borderRight: 'none',
                            background: '#f4f4f4',
                            width: '100%',
                            maxWidth: '300px',
                            padding: '10px 15px',
                            fontSize: '0.9rem',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                        }}
                        onFocus={(e) => {
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                            e.target.style.borderColor = '#28a745';
                        }}
                        onBlur={(e) => {
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                            e.target.style.borderColor = '#28a745';
                        }}
                    />
                </Col>
                <Col xs={4} sm={2} className="p-0">
                    <Button
                        type='submit'
                        variant='success'
                        className='w-100'
                        style={{
                            borderRadius: '0 30px 30px 0',
                            padding: '10px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)')}
                        onMouseLeave={(e) => (e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)')}
                    >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '6px', color: '#fff' }} />
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBox;
