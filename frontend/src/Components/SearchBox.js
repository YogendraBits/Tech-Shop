import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

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
                <Col sm={9}>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search Products...'
                        style={{ borderRadius: '200px 0 0 20px', border: '2px solid #ced4da', minWidth: '300px' }}
                    />
                </Col>
                <Col sm={3}>
                    <Button type='submit' variant='outline-success' className='p-2' style={{ borderRadius: '0 200px 20px 0'  }}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBox;
