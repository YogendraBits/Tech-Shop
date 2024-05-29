import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/formContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Card style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-100 mt-3"
                          style={{
                              borderRadius: '10px',
                              fontWeight: 'bold',
                              letterSpacing: '0.5px',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                          }}
                      >
                          Register
                      </Button>

                    </Form>
                    <div className="mt-4 text-center">
                      <p className="mb-2">Already Have An Account?</p>
                      <Link
                          to={redirect ? `/login?redirect=${redirect}` : '/login'}
                          className="btn btn-outline-primary text-uppercase text-decoration-none"
                          style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}
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
