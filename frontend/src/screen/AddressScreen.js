import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAddresses, deleteAddress, createAddress, updateAddress } from '../actions/addressActions.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import './AddressScreen.css'; // Import the CSS file

const AddressScreen = () => {
    const dispatch = useDispatch();

    const addressList = useSelector((state) => state.addressList);
    const { loading, error, addresses } = addressList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // State for editing
    const [addressToEdit, setAddressToEdit] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    // Using custom hook for current location
    const { getCurrentLocation, loadingLocation } = useCurrentLocation();

    useEffect(() => {
        if (userInfo) {
            dispatch(listAddresses());
        }
    }, [dispatch, userInfo]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            dispatch(deleteAddress(id));
        }
    };

    const handleAddAddress = (addressData) => {
        dispatch(createAddress(addressData));
        resetForm();
    };

    const handleUpdateAddress = (id, addressData) => {
        dispatch(updateAddress(id, addressData));
        resetEditing();
    };

    const resetForm = () => {
        setAddress('');
        setCity('');
        setPostalCode('');
        setCountry('');
    };

    const resetEditing = () => {
        setAddressToEdit(null);
        resetForm();
    };
    
    const handleEditAddress = (address) => {
        setAddressToEdit(address);
        setAddress(address.address);
        setCity(address.city);
        setPostalCode(address.postalCode);
        setCountry(address.country);
    };
    
    return (
        <div className="address-screen-container">
            {userInfo ? (
                <div className="address-layout">
                    <div className="address-list">
                        <h1>Your Addresses</h1>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            addresses.length > 0 ? (
                                addresses.map((address) => (
                                    <div className="address-item" key={address._id}>
                                        <div className="address-details">
                                            <h3>{address.address}</h3>
                                            <p>{address.city}, {address.postalCode}, {address.country}</p>
                                        </div>
                                        <div className="address-actions">
                                            <button className="icon-button" onClick={() => handleEditAddress(address)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className="icon-button" onClick={() => handleDelete(address._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No addresses found. Please add an address.</p>
                            )
                        )}
                    </div>
                    <div className="address-form-container">
                        <h2>{addressToEdit ? 'Edit Address' : 'Add Address'}</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (addressToEdit) {
                                handleUpdateAddress(addressToEdit._id, { address, city, postalCode, country });
                            } else {
                                handleAddAddress({ address, city, postalCode, country });
                            }
                        }}>
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                disabled={loadingLocation} // Disable input during loading
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                disabled={loadingLocation} // Disable input during loading
                            />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                disabled={loadingLocation} // Disable input during loading
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                disabled={loadingLocation} // Disable input during loading
                            />
                            <div className="address-buttons">
                                <button type="submit" disabled={loadingLocation}> {/* Disable button during loading */}
                                    {addressToEdit ? 'Update Address' : 'Add Address'}
                                </button>
                                <button type="button" className="current-location-button" onClick={() => getCurrentLocation(setAddress, setCity, setPostalCode, setCountry)} disabled={loadingLocation}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'red' }} />
                                    <span>  Current Location</span>
                                </button>
                            </div>
                        </form>
                        {loadingLocation && <p className="loading-message">Getting your location...</p>} {/* Loading message */}
                    </div>
                </div>
            ) : (
                <div className="login-prompt">
                    <h2>You need to log in to manage your addresses</h2>
                    <Link to="/login" className="login-button">Login Here</Link>
                </div>
            )}
        </div>
    );
};

export default AddressScreen;