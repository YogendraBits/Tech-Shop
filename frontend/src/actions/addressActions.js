import axios from 'axios';
import {
    ADDRESS_LIST_REQUEST,
    ADDRESS_LIST_SUCCESS,
    ADDRESS_LIST_FAIL,
    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_CREATE_FAIL,
    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL,
    ADDRESS_DELETE_REQUEST,
    ADDRESS_DELETE_SUCCESS,
    ADDRESS_DELETE_FAIL,
} from '../constants/addressConstants.js';

// Get Addresses
export const listAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/addresses', config);

        dispatch({
            type: ADDRESS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADDRESS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Create Address
export const createAddress = (addressData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/addresses', addressData, config);

        dispatch({
            type: ADDRESS_CREATE_SUCCESS,
            payload: data,
        });

        // Fetch updated address list
        dispatch(listAddresses());
    } catch (error) {
        dispatch({
            type: ADDRESS_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Update Address
export const updateAddress = (id, addressData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/addresses/${id}`, addressData, config);

        dispatch({
            type: ADDRESS_UPDATE_SUCCESS,
            payload: data,
        });

        // Fetch updated address list
        dispatch(listAddresses());
    } catch (error) {
        dispatch({
            type: ADDRESS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Delete Address
export const deleteAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADDRESS_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/addresses/${id}`, config);

        dispatch({
            type: ADDRESS_DELETE_SUCCESS,
        });

        // Fetch updated address list
        dispatch(listAddresses());
    } catch (error) {
        dispatch({
            type: ADDRESS_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
