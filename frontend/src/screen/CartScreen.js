import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeFromCart, updateCartItem } from '../actions/cartActions'; 
import { Link } from 'react-router-dom'; // Import Link
import './CartScreen.css'; 

const CartScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const [error, setError] = useState('');
    const [quantities, setQuantities] = useState({}); // State to hold the quantities

    // Load cart items on component mount
    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    // Initialize quantities state
    useEffect(() => {
        const initialQuantities = cartItems.reduce((acc, item) => {
            acc[item._id] = item.qty; // Set initial quantity for each item
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cartItems]);

    // Handler to remove an item from the cart
    const removeItemHandler = async (itemId) => {
        try {
            await dispatch(removeFromCart(itemId));
        } catch (err) {
            setError('Failed to remove item from cart.');
        }
    };

    // Handler to update item quantity
    const updateQuantityHandler = async (itemId, quantity) => {
        try {
            if (quantity < 1) return; // Prevent negative quantities
            await dispatch(updateCartItem(itemId, quantity)); // Update item quantity in the database
            window.location.reload();
        } catch (err) {
            setError('Failed to update item quantity.');
        }
    };

    // Update local quantity state when input changes
    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: newQuantity,
        }));
    };

    // Handler for proceeding to checkout
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    // Handler for navigating to the shop
    const shopNowHandler = () => {
        history.push('/'); // Redirects to home screen
    };

    return (
        <div className="cart-main">
            <div className="product-section">
                <h1 className="cart-header">Your Cart</h1>
                {error && <div className="error-notification">{error}</div>}
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <h2 className="empty-cart-header">Uh oh! Your cart is empty.</h2>
                        <button className="shop-now-btn" onClick={shopNowHandler}>Shop Now</button>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <div className="item-details">
                                <Link to={`/product/${item.product._id}`}>
                                    <img src={item.image} alt={item.name} className="item-image" />
                                </Link>
                                <Link to={`/product/${item.product._id}`}>
                                    <h2 className="item-name">{item.name}</h2>
                                </Link>
                                <div>
                                    <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                                    <p className="item-subtotal">
                                        Subtotal: ${(item.price * quantities[item._id]).toFixed(2)}
                                    </p>
                                    <div className="quantity-controller">
                                        {/* <button 
                                            onClick={() => handleQuantityChange(item._id, Math.max(1, quantities[item._id] - 1))} 
                                            disabled={quantities[item._id] <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button> */}
                                        <input 
                                            type="number" 
                                            value={quantities[item._id]} 
                                            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                            min="1"
                                            className="quantity-input"
                                        />
                                        {/* <button 
                                            onClick={() => handleQuantityChange(item._id, quantities[item._id] + 1)} 
                                            className="quantity-btn"
                                        >
                                            +
                                        </button> */}
                                        <button 
                                            onClick={() => updateQuantityHandler(item._id, quantities[item._id])} 
                                            className="update-btn"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="remove-btn" 
                                    onClick={() => removeItemHandler(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartItems.length > 0 && (
                <div className="total-section">
                    <div className="total-summary">
                        <h2 className="total-amount">
                            Total: ${cartItems.reduce((acc, item) => acc + item.price * quantities[item._id], 0).toFixed(2)}
                        </h2>
                        <button onClick={checkoutHandler} className="checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
