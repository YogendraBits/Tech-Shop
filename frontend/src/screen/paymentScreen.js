import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/formContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const handleSelect = (method) => {
        setPaymentMethod(method);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px' }}>
            <div style={{ flex: '2', paddingRight: '10px', minHeight: '200px' }}>
                <CheckoutSteps step1 step2 step3 />
            </div>
            <div style={{ flex: '7', paddingLeft: '10px', minWidth: '500px' }}>
                <FormContainer>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: '500px' }}>
                        <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginBottom: '20px' }}>Payment Method</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <div
                                    style={{ background: paymentMethod === 'PayPal' ? '#007bff' : '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px', cursor: 'pointer' }}
                                    onClick={() => handleSelect('PayPal')}
                                    className="payment-tile"
                                >
                                    <Form.Check
                                        type='radio'
                                        label='PayPal or Credit Card'
                                        id='PayPal'
                                        name='paymentMethod'
                                        value='PayPal'
                                        checked={paymentMethod === 'PayPal'}
                                        onChange={() => handleSelect('PayPal')}
                                        style={{ fontSize: '16px', color: paymentMethod === 'PayPal' ? '#fff' : '#333' }}
                                    />
                                </div>
                                <div
                                    style={{ background: paymentMethod === 'UPI' ? '#007bff' : '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px', cursor: 'pointer' }}
                                    onClick={() => handleSelect('UPI')}
                                    className="payment-tile"
                                >
                                    <Form.Check
                                        type='radio'
                                        label='UPI (Unified Payments Interface)'
                                        id='UPI'
                                        name='paymentMethod'
                                        value='UPI'
                                        checked={paymentMethod === 'UPI'}
                                        onChange={() => handleSelect('UPI')}
                                        style={{ fontSize: '16px', color: paymentMethod === 'UPI' ? '#fff' : '#333' }}
                                    />
                                </div>
                                <div
                                    style={{ background: paymentMethod === 'Cash' ? '#007bff' : '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px', cursor: 'pointer' }}
                                    onClick={() => handleSelect('Cash')}
                                    className="payment-tile"
                                >
                                    <Form.Check
                                        type='radio'
                                        label='Cash on Delivery'
                                        id='Cash'
                                        name='paymentMethod'
                                        value='Cash'
                                        checked={paymentMethod === 'Cash'}
                                        onChange={() => handleSelect('Cash')}
                                        style={{ fontSize: '16px', color: paymentMethod === 'Cash' ? '#fff' : '#333' }}
                                    />
                                </div>
                            </Form.Group>

                            <Button type='submit' variant='primary' className="w-100" style={{ fontSize: '16px', marginTop: '20px', background: '#007bff', border: 'none', borderRadius: '5px', padding: '10px 20px' }}>
                                Continue
                            </Button>
                        </Form>
                    </div>
                </FormContainer>
            </div>
        </div>
    );
};

export default PaymentScreen;
