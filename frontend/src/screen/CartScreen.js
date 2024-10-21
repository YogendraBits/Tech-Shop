import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeFromCart, updateCartItem } from '../actions/cartActions';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';
import './CartScreen.css';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [error, setError] = useState('');
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    useEffect(() => {
        const initialQuantities = cartItems.reduce((acc, item) => {
            acc[item._id] = item.qty;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cartItems]);

    const removeItemHandler = async (itemId) => {
        try {
            await dispatch(removeFromCart(itemId));
        } catch (err) {
            setError('Failed to remove item from cart.');
        }
    };

    const updateQuantityHandler = async (itemId, quantity) => {
        try {
            if (quantity < 1) return;
            await dispatch(updateCartItem(itemId, quantity));

            // Update the local quantities state after a successful backend update
            setQuantities((prev) => ({
                ...prev,
                [itemId]: quantity, // Set the input field to the updated quantity
            }));
        } catch (err) {
            setError('Failed to update item quantity.');
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const item = cartItems.find(item => item._id === itemId);
        if (item && newQuantity <= item.countInStock) {
            setQuantities((prev) => ({
                ...prev,
                [itemId]: newQuantity,
            }));
        } else if (newQuantity > item.countInStock) {
            setError('Quantity exceeds available stock.');
        }
    };

    const checkoutHandler = () => {
        if (!userInfo) {
            navigate('/login?redirect=shipping');
        } else {
            navigate('/shipping');
        }
    };

    const shopNowHandler = () => {
        navigate('/');
    };

    return (
        <div className="cart-main">
            <h1 className="cart-header">🛒 Your Cart</h1>
            {error && <div className="error-notification">{error}</div>}
            {!userInfo ? (
                <div className="login-prompt">
                    <h5>Please log in to add items to your cart.</h5>
                    <button onClick={() => navigate('/login')} className="login-btn">Log In</button>
                </div>
            ) : (
                <>
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h2>🛑 Your Cart is Empty</h2>
                            <button onClick={shopNowHandler} className="shop-now-btn">🛍️ Shop Now</button>
                        </div>
                    ) : (
                        <>
                            {cartItems.map(item => {
                                return (
                                    <div key={item._id} className="cart-item">
                                        <Link to={`/product/${item.product._id}`} className="item-details">
                                            <img src={item.image} alt={item.name} className="item-image" />
                                            <div>
                                                <h2 className="item-name">{item.name}</h2>
                                                <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                                                <p className="item-subtotal">
                                                    Subtotal: ${(item.price * quantities[item._id] || 0).toFixed(2)}
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="quantity-controller">
                                            <button onClick={() => handleQuantityChange(item._id, Math.max(1, quantities[item._id] - 1))} className="quantity-btn">
                                                <FaMinus />
                                            </button>
                                            <input
                                                type="number"
                                                value={quantities[item._id] || 1}
                                                onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                                min="1"
                                                max={item.countInStock} // Limit input to available stock
                                                className="quantity-input"
                                            />
                                            <button onClick={() => handleQuantityChange(item._id, Math.min(item.countInStock, quantities[item._id] + 1))} className="quantity-btn">
                                                <FaPlus />
                                            </button>
                                            <button onClick={() => updateQuantityHandler(item._id, quantities[item._id])} className="update-btn">
                                                <FaCheckCircle />
                                            </button>
                                        </div>
                                        <button onClick={() => removeItemHandler(item._id)} className="remove-btn">
                                            <FaTrash />
                                        </button>
                                    </div>
                                );
                            })}
                            <div className="total-section">
                                <h2 className="total-amount">
                                    Total: ${cartItems.reduce((acc, item) => acc + item.price * quantities[item._id], 0).toFixed(2)}
                                </h2>
                                <button onClick={checkoutHandler} className="checkout-btn">🛒 Checkout</button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CartScreen;
