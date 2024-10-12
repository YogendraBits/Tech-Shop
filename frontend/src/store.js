import { createStore, combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productReviewUpdateReducer,
    productReviewDeleteReducer

} from './reducers/productReducres';
import { cartReducer } from './reducers/cartReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducers';
import { wishlistReducer } from './reducers/wishlistReducers'; 


import { addressListReducer, addressCreateReducer, addressUpdateReducer, addressDeleteReducer } from './reducers/addressReducers.js';

const reducer = combineReducers({

    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productReviewUpdateReducer,
    productReviewDelete: productReviewDeleteReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,

    wishlist: wishlistReducer, 

    addressList: addressListReducer,
    addressCreate: addressCreateReducer,
    addressUpdate: addressUpdateReducer,
    addressDelete: addressDeleteReducer,
});


const cartItemsFromStorage = [];

// Load user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

// Load shipping address from localStorage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {};

// Initial state with userInfo from Google login if applicable
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
    wishlist: { wishlistitems: [] },
};

const middleware = [thunk];

// Create Redux store with reducers, initial state, and middleware
// const store = createStore(
//     reducer, 
//     initialState, 
//     composeWithDevTools(applyMiddleware(...middleware))
// );

const store = configureStore({
    reducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production', // Enable dev tools in development
});

export default store;
