import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { register } from '../actions/userActions';
import './RegisterScreen.css'; // Custom CSS for side-by-side layout

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const location = useLocation(); // Get location
    const navigate = useNavigate(); // Get navigate

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const redirect = new URLSearchParams(location.search).get('redirect') || '/'; // Get redirect param

    useEffect(() => {
        if (userInfo) {
            navigate(redirect); // Use navigate to redirect
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <div className="register-screen">
            <Card className="modern-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="name">
                                    <Form.Label className="form-label">Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter full name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="modern-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="email">
                                    <Form.Label className="form-label">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="modern-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="password">
                                    <Form.Label className="form-label">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="modern-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label className="form-label">Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="modern-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-3 modern-button"
                        >
                            Sign Up
                        </Button>
                    </Form>
                    <div className="mt-4 text-center">
                        <p className="mb-2">Already have an account?</p>
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className="modern-link"
                        >
                            Sign In
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RegisterScreen;
