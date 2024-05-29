import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../Components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Row className="mt-4">
        <Col md={8}>
        <Button onClick={history.goBack} variant="light" className="mb-3">
                    <i className="fas fa-arrow-left mr-2"></i>  Go Back
                </Button>
                <h3 className="mb-4" style={{fontWeight: 'bold', fontSize: '2rem', color: '#333' }}> Shopping Cart </h3>
          {cartItems.length === 0 ? (
            
                <Message style={{ backgroundColor: '#f8d7da', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#721c24' }}>Uh-oh! 😯</div>
                <div style={{ fontSize: '1.2rem', color: '#721c24' }}>Looks like your bag is empty. Let's fix that!</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold', padding: '0.5rem 1rem', backgroundColor: '#007bff', border: '1px solid #007bff', borderRadius: '0.5rem', transition: 'background-color 0.3s' }}>
                        Start Shopping
                    </Link>
                </div>
            </Message>            
                                                
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product} className="border-0">
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`} className="text-decoration-none">
                                            {item.name}
                                        </Link>
                                    </Col>
                              <Col md={2}>${item.price}</Col>
                              
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={e =>
                                                dispatch(addToCart(item.product, Number(e.target.value)))
                                            }
                                            className="custom-select"
                                        >
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                              </Col>
                              

                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}
                                            className="border-0"
                                        >
                                            <i className="fas fa-trash text-danger"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2 className="mb-0">
                                Subtotal (
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            <h3 className="mt-1">
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn-block mt-4"
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                          style={{
                              backgroundColor: cartItems.length === 0 ? '#adb5bd' : '#007bff',
                              color: '#fff',
                              fontWeight: 'bold',
                              borderRadius: '10px',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                              transition: 'background-color 0.3s ease',
                              cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
                          }}
                      >
                          {cartItems.length === 0 ? 'Your Cart Is Empty' : 'Proceed To Checkout'}
                      </Button>

                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
