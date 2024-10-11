import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeFromCart, updateCartItem } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';
import './CartScreen.css';

const CartScreen = ({ history }) => {
    const dispatch = useDispatch();

    // Retrieve cart and user login state from Redux store
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
            window.location.reload();
        } catch (err) {
            setError('Failed to update item quantity.');
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: newQuantity,
        }));
    };

    const checkoutHandler = () => {
        if (!userInfo) {
            history.push('/login?redirect=shipping');
        } else {
            history.push('/shipping');
        }
    };

    const shopNowHandler = () => {
        history.push('/');
    };

    return (
        <div className="cart-main">
            <h1 className="cart-header">🛒 Your Cart</h1>
            {error && <div className="error-notification">{error}</div>}
            {!userInfo ? (
                <div className="login-prompt">
                    <h5>Please log-in to add items to your cart.</h5>
                    <button onClick={() => history.push('/login')} className="login-btn">Log In</button>
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
                            {cartItems.map(item => (
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
                                            className="quantity-input"
                                        />
                                        <button onClick={() => handleQuantityChange(item._id, quantities[item._id] + 1)} className="quantity-btn">
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
                            ))}
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
