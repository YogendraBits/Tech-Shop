// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadCart, removeFromCart } from '../actions/cartActions'; // Adjust based on your action file structure
// import './CartScreen.css'; // Make sure to import your CSS file for styling

// const CartScreen = ({ history }) => {
//     const dispatch = useDispatch();
//     const cart = useSelector(state => state.cart);
//     const { cartItems } = cart;

//     // Load the cart from the database when the component mounts
//     useEffect(() => {
//         dispatch(loadCart());
//     }, [dispatch]);

//     // Group items by product ID and aggregate quantities
//     const groupedItems = cartItems.reduce((acc, item) => {
//         const existingItem = acc.find(i => i.product.toString() === item.product.toString());
//         if (existingItem) {
//             existingItem.qty += item.qty; // Increment the quantity if item already exists
//         } else {
//             acc.push({ ...item }); // Push a new item to the accumulator
//         }
//         return acc;
//     }, []);

//     // Function to remove an item from the cart
//     const removeItemHandler = async (cartId, itemId, productId) => {
//         // Optionally, you can show a loading state here
//         await dispatch(removeFromCart(cartId, productId, itemId)); // Dispatch action to remove item from cart
//     };

//     // Handle checkout button click
//     const checkoutHandler = () => {
//         history.push('/login?redirect=shipping'); // Redirect to login if not logged in
//     };

//     return (
//         <div className="cart-container">
//             <h1>Your Cart</h1>
//             {groupedItems.length === 0 ? (
//                 <div>Your cart is empty</div>
//             ) : (
//                 <div>
//                     {groupedItems.map(item => (
//                         <div key={item._id} className="cart-item">
//                             <div className="cart-item-details">
//                                 <h2>{item.name}</h2>
//                                 <img src={item.image} alt={item.name} className="cart-item-image" />
//                                 <p>Price: ${item.price.toFixed(2)}</p>
//                                 <p>Quantity: {item.qty}</p>
//                                 <button onClick={() => removeItemHandler('67034e72ffda45175c236982', item.product,item._id)}>
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="cart-total">
//                         <h2>
//                             Total: ${groupedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
//                         </h2>
//                         <button onClick={checkoutHandler} className="checkout-button">
//                             Proceed to Checkout
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartScreen;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeFromCart } from '../actions/cartActions'; 
import './CartScreen.css'; 

const CartScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    const removeItemHandler = async (itemId) => {
        try {
            await dispatch(removeFromCart(itemId)); // Dispatch action to remove item from cart
        } catch (err) {
            setError('Failed to remove item from cart.'); // Display an error message
        }
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping'); // Redirect to login if not logged in
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
            {cartItems.length === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <div className="cart-item-details">
                                <h2>{item.name}</h2>
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.qty}</p>
                                <button onClick={() => removeItemHandler(item._id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h2>
                            Total: ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                        </h2>
                        <button onClick={checkoutHandler} className="checkout-button">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
