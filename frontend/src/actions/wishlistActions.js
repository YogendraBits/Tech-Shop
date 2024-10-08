import axios from 'axios';
import {
    WISHLIST_REQUEST,
    WISHLIST_SUCCESS,
    WISHLIST_FAIL,
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
} from '../constants/wishlistConstants';


// Fetch Wishlist
export const fetchWishlist = () => async (dispatch, getState) => {
    try {
        dispatch({ type: WISHLIST_REQUEST });

        // Get user info from state
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/wishlist', config); // Update URL according to your API

        dispatch({
            type: WISHLIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Add an item to the wishlist
export const addTowishlist = (productId,qty) => async (dispatch, getState) => {
    const { userInfo } = getState().userLogin; // Ensure you have user login info

    if (!userInfo) {
        console.error('User not logged in');
        return; // Prevent action if user is not logged in
    }
    
    try {
        // Make an API call to add the product to the wishlist in the database
        const { data } = await axios.post('/api/wishlist', {
            productId,
            quantity: qty,
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Include the token for authentication
            },
        });

        dispatch({
            type: WISHLIST_ADD_ITEM,
            payload: data.wishlistitems, // Assuming your API returns the updated wishlist items
            
        });
        

    } 
    catch (error) {
        console.error('Failed to add item to wishlist', error);
    }
};

// Remove an item from the wishlist
export const removeFromwishlist = (itemId) => async (dispatch, getState) => {
    const { userInfo } = getState().userLogin; // Ensure you have user login info

    if (!userInfo) {
        console.error('User not logged in');
        return; // Prevent action if user is not logged in
    }

    try {
        // Make an API call to remove the product from the wishlist in the database
        await axios.delete(`/api/wishlist/${itemId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Include the token for authentication
            },
        });

        dispatch({
            type: WISHLIST_REMOVE_ITEM,
            payload: itemId, // Send the product ID to remove from state
        });

    } catch (error) {
        console.error('Failed to remove item from wishlist', error);
    }
};