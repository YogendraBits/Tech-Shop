import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/formContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping'); // Redirect if no shipping address
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const handleSelect = (method) => {
        setPaymentMethod(method);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder'); // Use navigate for redirection
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
                                {['PayPal', 'UPI', 'Cash'].map((method) => (
                                    <div
                                        key={method}
                                        style={{ background: paymentMethod === method ? '#007bff' : '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px', cursor: 'pointer' }}
                                        onClick={() => handleSelect(method)}
                                        className="payment-tile"
                                    >
                                        <Form.Check
                                            type='radio'
                                            label={method === 'PayPal' ? 'PayPal or Credit Card' : method === 'UPI' ? 'UPI (Unified Payments Interface)' : 'Cash on Delivery'}
                                            id={method}
                                            name='paymentMethod'
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={() => handleSelect(method)}
                                            style={{ fontSize: '16px', color: paymentMethod === method ? '#fff' : '#333' }}
                                        />
                                    </div>
                                ))}
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
