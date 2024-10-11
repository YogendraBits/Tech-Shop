import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
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
                            borderRadius: '30px 0 0 30px', // Rounded left side
                            border: '2px solid #28a745',
                            borderRight: 'none', // Remove right border to merge with button
                            background: '#f4f4f4', // Light gray background for consistency
                            width: '100%',
                            maxWidth: '300px', // Reduced width
                            padding: '10px 15px', // Adjust padding
                            fontSize: '0.9rem', // Adjust font size
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                        }}
                        onFocus={(e) => {
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                            e.target.style.borderColor = '#28a745'; // Green border on focus
                        }}
                        onBlur={(e) => {
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                            e.target.style.borderColor = '#28a745'; // Maintain green border color
                        }}
                    />
                </Col>
                <Col xs={4} sm={2} className="p-0">
                    <Button
                        type='submit'
                        variant='success'
                        className='w-100'
                        style={{
                            borderRadius: '0 30px 30px 0', // Rounded right side
                            padding: '10px',
                            backgroundColor: '#28a745', // Matching button color
                            color: '#fff', // White text for contrast
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
