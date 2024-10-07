import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
    const loaderContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full screen height
        textAlign: 'center',
    };

    const spinnerStyle = {
        width: '80px',
        height: '80px',
        borderWidth: '6px', // Thicker border for a sleek look
        color: '#1abc9c', // Custom color for the spinner
        marginBottom: '20px',
    };

    const loadingTextStyle = {
        fontSize: '1.2rem',
        color: '#2c3e50', // Darker text color
        fontWeight: '600',
        letterSpacing: '1px',
    };

    return (
        <div style={loaderContainerStyle}>
            <Spinner animation="border" role="status" style={spinnerStyle}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div style={loadingTextStyle}>Loading, please wait...</div>
        </div>
    );
}

export default Loader;
