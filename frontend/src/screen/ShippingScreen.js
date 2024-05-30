import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/formContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

function ShippingScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px' }}>
            <div style={{ flex: '2', paddingRight: '1px', minHeight: '200px' }}>
                <CheckoutSteps step1 step2 />
            </div>
            <div style={{ flex: '7', paddingLeft: '10px', minWidth: '500px' }}>
                <FormContainer>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: '500px' }}>
                        <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginBottom: '20px' }}>Shipping Information</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='address'>
                                <Form.Label style={{ fontSize: '16px', color: '#333' }}>Address</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={{ fontSize: '14px', marginTop: '10px', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </Form.Group>

                            <Form.Group controlId='city'>
                                <Form.Label style={{ fontSize: '16px', color: '#333' }}>City</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter City Name'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={{ fontSize: '14px', marginTop: '10px', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </Form.Group>

                            <Form.Group controlId='postalCode'>
                                <Form.Label style={{ fontSize: '16px', color: '#333' }}>Postal Code</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Postal Code'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    style={{ fontSize: '14px', marginTop: '10px', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </Form.Group>

                            <Form.Group controlId='country'>
                                <Form.Label style={{ fontSize: '16px', color: '#333' }}>Country</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Country Name'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    style={{ fontSize: '14px', marginTop: '10px', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </Form.Group>
                            <Button type='submit' variant="primary" style={{ fontSize: '16px', marginTop: '20px', background: '#007bff', border: 'none', borderRadius: '5px', padding: '10px 20px' }}>Continue</Button>
                        </Form>
                    </div>
                </FormContainer>
            </div>
        </div>
    );
}

export default ShippingScreen;
