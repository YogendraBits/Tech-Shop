import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Card style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    {error && <Message variant="danger">{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-3"
                            disabled={loading}
                            style={{ borderRadius: '10px', fontWeight: 'bold', letterSpacing: '0.5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                    </Form>
                    <div className="mt-4 text-center">
                      <p className="mb-2">New to our platform?</p>
                      <Link
                          to={redirect ? `/register?redirect=${redirect}` : '/register'}
                          className="btn btn-outline-primary text-uppercase text-decoration-none"
                          style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}
                      >
                          Create an Account
                      </Link>
                   </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginScreen;
