import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { addToCart } from '../actions/cartActions';
import { removeFromwishlist, fetchWishlist } from '../actions/wishlistActions';
import { FaTrash, FaShoppingCart, FaHeartBroken } from 'react-icons/fa'; 
import './WishlistScreen.css';

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin; 
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistitems = [], loading, error } = wishlist; 

    const [addedToCart, setAddedToCart] = useState({});

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, userInfo]);

    const handleAddToCart = (productId, quantity) => {
        dispatch(addToCart(productId, quantity)); 
        setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    };

    const handleRemoveFromwishlist = (id) => {
        dispatch(removeFromwishlist(id));
    };

    return (
        <div className="wis-screen">
            <h1 className="wis-title">Your Wishlist</h1>
            {!userInfo ? (
                <div className="login-prompt">
                    <Message>Please log in to see your wishlist.</Message>
                    <Button className="login-button" onClick={() => navigate('/login')}>
                        Log In
                    </Button>
                </div>
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : wishlistitems.length === 0 ? (
                <div className="empty-wishlist-container">
                    <FaHeartBroken className="empty-wishlist-icon" />
                    <Message className="wis-empty-message">
                        Your wishlist is empty.
                    </Message>
                    <Button className="empty-button" onClick={() => navigate('/')}>
                        Browse Products
                    </Button>
                </div>
            ) : (
                <Row className="wis-list-group">
                    {wishlistitems.map((item) => (
                        <Col xs={12} sm={6} md={4} key={item._id} className="wis-list-item">
                            <div className="wis-tile">
                                <Link to={`/product/${item.productId?._id}`}>
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="wis-item-image" 
                                    />
                                </Link>
                                <div className="wis-item-info">
                                    <Link to={`/product/${item.productId?._id}`}>
                                        <strong className="wis-item-name">{item.name}</strong>
                                    </Link>
                                </div>
                                <div className="wis-item-actions">
                                    {addedToCart[item.productId?._id] ? (
                                        <Button variant="success" onClick={() => navigate('/cart')} className="wis-button wis-added-button">
                                            <FaShoppingCart />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => handleAddToCart(item.productId._id, item.quantity)}
                                            className="wis-button wis-add-button"
                                        >
                                            <FaShoppingCart />
                                        </Button>
                                    )}
                                    <span className="wis-quantity-display">Qty: {item.quantity}</span>
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => handleRemoveFromwishlist(item._id)} 
                                        className="wis-button wis-remove-button"
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default WishlistScreen;
