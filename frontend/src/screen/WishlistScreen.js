import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { addToCart } from '../actions/cartActions';
import { removeFromwishlist, fetchWishlist } from '../actions/wishlistActions';
import { FaTrash } from 'react-icons/fa';
import './WishlistScreen.css';

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const wishlist = useSelector((state) => state.wishlist);
    const cart = useSelector((state) => state.cart);
    const { wishlistitems, loading, error } = wishlist;

    const [addedToCart, setAddedToCart] = useState({});
    const [quantity, setQuantity] = useState({});

    // Fetch wishlist items when the component mounts and when wishlistitems change
    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    // Effect to check which wishlist items are already in the cart
    useEffect(() => {
        const cartItems = cart.cartItems.map(item => item.product); // Get array of product IDs from cart
        const initialAddedToCart = {};
        const initialQuantity = {};

        wishlistitems.forEach(item => {
            if (cartItems.includes(item.productId)) {
                initialAddedToCart[item.productId] = true; // Mark item as added to cart
            }
            initialQuantity[item.productId] = 1; // Default quantity for wishlist items
        });

        setAddedToCart(initialAddedToCart); // Set initial state
        setQuantity(initialQuantity); // Set initial quantity state
    }, [wishlistitems, cart.cartItems]);

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId, quantity[productId])); // Add selected quantity of the item to the cart
        setAddedToCart((prev) => ({ ...prev, [productId]: true })); // Update local state to show the item has been added
    };

    const handleRemoveFromwishlist = async (id) => {
        await dispatch(removeFromwishlist(id)); // Remove item from wishlist
        dispatch(fetchWishlist()); // Re-fetch wishlist items to get the latest state
    };

    const goToCart = () => {
        history.push('/cart'); // Redirect to the cart page
    };

    return (
        <div className="wis-screen">
            <h1 className="wis-title">Your Wishlist</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : wishlistitems.length === 0 ? (
                <Message className="wis-empty-message">Your wishlist is empty</Message>
            ) : (
                <ListGroup className="wis-list-group">
                    {wishlistitems.map((item) => (
                        <ListGroup.Item key={item._id} className="wis-list-item">
                            <Row>
                                <Col md={3}>
                                    <Link to={`/product/${item.productId}`}>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="wis-item-image" 
                                        />
                                    </Link>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.productId}`}>
                                        <strong className="wis-item-name">{item.name}</strong>
                                    </Link>
                                </Col>
                                <Col md={3} className="wis-item-price">${item.price}</Col>
                                <Col md={3} className="wis-item-actions d-flex align-items-center justify-content-between">
                                    <Form.Control
                                        type="number"
                                        value={quantity[item.productId] || 1}
                                        onChange={(e) => setQuantity({ ...quantity, [item.productId]: e.target.value })}
                                        className="wis-quantity-input"
                                        min={1}
                                        max={item.countInStock}
                                    />
                                    {addedToCart[item.productId] ? (
                                        <Button variant="success" onClick={goToCart} className="wis-added-button">
                                            Go to Cart
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => handleAddToCart(item.productId)}
                                            className="wis-add-button"
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => handleRemoveFromwishlist(item._id)} // Pass _id
                                        className="wis-remove-button"
                                    >
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default WishlistScreen;
