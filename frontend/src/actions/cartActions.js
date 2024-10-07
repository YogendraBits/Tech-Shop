import axios from "axios";
import { CART_ADD_ITEM ,CART_LOAD_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";


export const loadCart = () => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState(); // Get user info from state

    if (userInfo) {
        const { data } = await axios.get('/api/cart/mycart', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Include token for authorization
            },
        });

        dispatch({
            type: CART_LOAD_ITEMS,
            payload: data.cartItems, // Assuming the cart items are returned in this format
        });
    }
};


// Add to Cart Action
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState(); // Get user info from state

    try {
        const { data } = await axios.get(`/api/products/${id}`); // Get product details

        const cartItem = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        };

        if (userInfo) {
            const { data: existingCart } = await axios.get('/api/cart/mycart', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

            const existingItem = existingCart.cartItems.find(item => item.product.toString() === cartItem.product.toString());

            if (existingItem) {
                // Item already exists, update the quantity
                existingItem.qty += qty;

                // Update the cart on the backend
                await axios.put(`/api/cart/${existingCart._id}`, { cartItems: existingCart.cartItems }, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
            } else {
                // Item does not exist, add it
                await axios.post('/api/cart', { cartItem }, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`, // Include token for authorization
                    },
                });
            }

            // Dispatch action to add item to Redux state
            dispatch({
                type: CART_ADD_ITEM,
                payload: cartItem,
            });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        // Optionally, dispatch an error action here if you want to handle it in the UI
    }
};


export const removeFromCart = (itemId) => async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;

    if (!userInfo) {
        console.error('User not logged in');
        return;
    }

    try {
        // Find the user's cart
        const { data: cart } = await axios.get('/api/cart/mycart', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        // Send request to delete the item
        await axios.delete(`/api/cart/${cart._id}/item/${itemId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        dispatch({
            type: CART_REMOVE_ITEM,
            payload: itemId,
        });

    } catch (error) {
        console.error('Failed to remove item from cart', error);
    }
};




export const saveShippingAddress =(data) => (dispatch ) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))

}

export const savePaymentMethod =(data) => (dispatch ) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload:data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))

}