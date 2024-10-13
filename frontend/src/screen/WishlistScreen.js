import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Pagination } from 'react-bootstrap';
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
    const { wishlistitems = [], loading, error, pages, page, totalItems } = wishlist;

    const [addedToCart, setAddedToCart] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch wishlist items when user logs in or currentPage changes
    useEffect(() => {
        if (userInfo) {
            dispatch(fetchWishlist(currentPage));
        }
    }, [dispatch, userInfo, currentPage]);

    const handleAddToCart = (productId, quantity) => {
        dispatch(addToCart(productId, quantity));
        setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    };

    const handleRemoveFromwishlist = (id) => {
        dispatch(removeFromwishlist(id));

        // Check if removing an item leads to the current page becoming empty
        if (wishlistitems.length === 1) { // Only one item on current page
            if (currentPage === 1) {
                // If we're on the first page, fetch the first page again
                dispatch(fetchWishlist(1)); // Fetch first page
            } else {
                // If we're on a non-first page, go back one page
                const previousPage = currentPage - 1;
                setCurrentPage(previousPage);
                dispatch(fetchWishlist(previousPage)); // Fetch previous page
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > pages) return;
        setCurrentPage(pageNumber);
        dispatch(fetchWishlist(pageNumber)); // Fetch the selected page
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(pages, startPage + maxVisiblePages - 1);

        if (startPage > 1) {
            items.push(
                <Pagination.First key="first" onClick={() => handlePageChange(1)} />
            );
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="first-ellipsis" />);
            }
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        if (endPage < pages) {
            if (endPage < pages - 1) {
                items.push(<Pagination.Ellipsis key="last-ellipsis" />);
            }
            items.push(
                <Pagination.Last key="last" onClick={() => handlePageChange(pages)} />
            );
        }

        return items;
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
            ) : totalItems === 0 || (wishlistitems.length === 0 && currentPage === 1) ? (  // Show empty message if no items
                <div className="empty-wishlist-container">
                    <FaHeartBroken className="empty-wishlist-icon" />
                    <Message className="wis-empty-message">Your wishlist is empty.</Message>
                    <Button className="empty-button" onClick={() => navigate('/')}>
                        Browse Products
                    </Button>
                </div>
            ) : (
                <>
                    <Row className="wis-list-group">
                        {wishlistitems.map((item) => (
                            <Col xs={12} sm={6} md={4} key={item._id} className="wis-list-item">
                                <div className="wis-tile">
                                    <Link to={`/product/${item.productId?._id}`}>
                                        <img src={item.image} alt={item.name} className="wis-item-image" />
                                    </Link>
                                    <div className="wis-item-info">
                                        <Link to={`/product/${item.productId?._id}`}>
                                            <strong className="wis-item-name">{item.name}</strong>
                                        </Link>
                                    </div>
                                    <div className="wis-item-actions">
                                        {addedToCart[item.productId?._id] ? (
                                            <Button
                                                variant="success"
                                                onClick={() => navigate('/cart')}
                                                className="wis-button wis-added-button"
                                            >
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
                    <Pagination className="wis-pagination justify-content-center mt-3">
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === pages} />
                        <Pagination.Last onClick={() => handlePageChange(pages)} disabled={page === pages} />
                    </Pagination>
                </>
            )}
        </div>
    );
};

export default WishlistScreen;
