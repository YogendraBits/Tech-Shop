import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/formContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import { listAddresses } from '../actions/addressActions'; // Import the action to fetch addresses

function ShippingScreen({ history }) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const addressList = useSelector((state) => state.addressList);
    const { addresses } = addressList; // Get addresses from the Redux state

    const [selectedAddress, setSelectedAddress] = useState('');

    useEffect(() => {
        dispatch(listAddresses()); // Fetch the stored addresses when the component mounts
    }, [dispatch]);

    useEffect(() => {
        if (shippingAddress) {
            setSelectedAddress(shippingAddress._id || '');
        }
    }, [shippingAddress]);

    const handleContinue = (e) => {
        e.preventDefault();
        const selectedAddr = addresses.find(addr => addr._id === selectedAddress);

        if (selectedAddr) {
            dispatch(saveShippingAddress(selectedAddr)); // Save the selected address
            history.push('/payment');
        }
    };

    const handleAddressChange = (e) => {
        const addressId = e.target.value;
        setSelectedAddress(addressId);
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

                        <Form onSubmit={handleContinue}>
                            <Form.Group controlId='addressSelect'>
                                <Form.Label style={{ fontSize: '16px', color: '#333' }}>Choose Address</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={selectedAddress}
                                    onChange={handleAddressChange}
                                    style={{ fontSize: '14px', marginTop: '10px', borderRadius: '5px' }}
                                >
                                    <option value=''>Choose Address...</option>
                                    {addresses && addresses.length > 0 ? (
                                        addresses.map((address) => (
                                            <option key={address._id} value={address._id}>
                                                {address.address}, {address.city}, {address.postalCode}, {address.country}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No addresses found</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                <Button 
                                    variant="primary" 
                                    onClick={() => {
                                        history.push('/address'); // Redirect to address management screen
                                    }}
                                >
                                    Manage Addresses
                                </Button>
                                <Button type='submit' variant="success" style={{ fontSize: '16px' }}>
                                    Payment
                                </Button>
                            </div>
                        </Form>
                    </div>
                </FormContainer>
            </div>
        </div>
    );
}

export default ShippingScreen;
