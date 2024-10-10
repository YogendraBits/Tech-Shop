import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { addToCart } from '../actions/cartActions';
import { removeFromwishlist, fetchWishlist } from '../actions/wishlistActions';
import { FaTrash, FaShoppingCart, FaHeartBroken } from 'react-icons/fa'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; // Add this to your imports
import './WishlistScreen.css';

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    // Get user and wishlist state from Redux
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin; 
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistitems = [], loading, error } = wishlist; 

    const [addedToCart, setAddedToCart] = useState({});

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchWishlist()); // Fetch wishlist if logged in
        }
    }, [dispatch, userInfo]);

    const handleAddToCart = (productId, quantity) => {
        dispatch(addToCart(productId, quantity)); 
        setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    };

    const handleRemoveFromwishlist = (id) => {
        dispatch(removeFromwishlist(id)).then(() => {
            window.location.reload();
        });
    };

    const goToCart = () => {
        history.push('/cart'); 
    };

    const goToLogin = () => {
        history.push('/login'); // Redirect to login page
    };

    const goToHome = () => {
        history.push('/'); 
    };

    return (
        <div className="wis-screen">
            <h1 className="wis-title">Your Wishlist</h1>
            {!userInfo ? (
                <div className="login-prompt">
                    <Message>Please log in to see your wishlist.</Message>
                    <Button className="login-button" onClick={goToLogin}>
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
                    <Button className="empty-button" onClick={goToHome}>
                        Browse Products
                    </Button>
                </div>
            ) : (
                <ListGroup className="wis-list-group">
                    {wishlistitems.map((item) => {
                        if (!item) return null; 
                        return (
                            <ListGroup.Item key={item._id} className="wis-list-item">
                                <Row>
                                    <Col md={3}>
                                        <Link to={`/product/${item.productId?._id}`}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="wis-item-image" 
                                            />
                                        </Link>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.productId?._id}`}>
                                            <strong className="wis-item-name">{item.name}</strong>
                                        </Link>
                                    </Col>
                                    <Col md={3} className="wis-item-price">${item.price}</Col>
                                    <Col md={3} className="wis-item-actions">
                                        <Form.Control
                                            type="number"
                                            value={item.quantity}
                                            className="wis-quantity-input"
                                            min={1}
                                            max={item.countInStock}
                                        />
                                        {addedToCart[item.productId?._id] ? (
                                            <Button variant="success" onClick={goToCart} className="wis-button wis-added-button">
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
                                        <Button
                                            type="button"
                                            variant="danger"
                                            onClick={() => handleRemoveFromwishlist(item._id)} 
                                            className="wis-button wis-remove-button"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
        </div>
    );
};

export default WishlistScreen;
