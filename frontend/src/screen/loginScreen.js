import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { login } from '../actions/userActions';
import './LoginScreen.css'; // Custom CSS to match modern look

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
        <div className="login-screen">
            <Card className="modern-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>

                        {/* Side-by-side fields for Email and Password */}
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="email">
                                    <Form.Label className="form-label">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email Address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="modern-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="password">
                                    <Form.Label className="form-label">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="modern-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-3 modern-button"
                            disabled={loading}
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
                            className="modern-link"
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
