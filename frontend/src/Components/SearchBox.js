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
        <Form onSubmit={submitHandler} inline>
            <Row className="align-items-center">
                <Col sm={8}>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search Products...'
                        style={{
                            borderRadius: '50px',
                            border: '2px solid #fff',
                            background: '#f4f4f4',
                            width: '100%',
                            maxWidth: '400px',
                            padding: '15px 25px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease'
                        }}
                    />
                </Col>
                <Col sm={4}>
                    <Button type='submit' variant='success' className='p-2' style={{ borderRadius: '50px', padding: '15px 25px', fontSize: '1rem', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '8px' }} />
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBox;
