import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'; // Import plus and minus icons
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../Components/Rating';
import { listProductDetails, createProductReview, updateProductReview, deleteProductReview } from '../actions/productActions'; 
import { addTowishlist } from '../actions/wishlistActions'; 
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DELETE_REVIEW_RESET } from '../constants/productConstants'; 
import { addToCart } from '../actions/cartActions';
import './ProductScreen.css';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(''); 
  const [editReviewId, setEditReviewId] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [reviewToDelete, setReviewToDelete] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [showLoginModal, setShowLoginModal] = useState(false); // New state for login modal

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  const productReviewDelete = useSelector((state) => state.productReviewDelete);
  const { success: successDeleteReview } = productReviewDelete;

  useEffect(() => {
    let isMounted = true; // Flag to track the component's mount status

    if (successProductReview) {
      setSuccessMessage('Review Submitted!'); 
      if (isMounted) {
            setShowSuccessModal(true); 
        }
      resetForm();
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (successDeleteReview) {
      setSuccessMessage('Review Deleted!');
      if (isMounted) {
        setShowSuccessModal(true); 
      }
      dispatch({ type: PRODUCT_DELETE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
    return () => {
      isMounted = false; // Cleanup: set the flag to false on unmount
    };
    
  }, [dispatch, match, successProductReview, successDeleteReview]);

  const resetForm = () => {
    setEditReviewId(null);
    setRating(0);
    setComment('');
  };

  const addToCartHandler = () => {
    if (userInfo) {
      dispatch(addToCart(product._id, qty));
    } else {
      setShowLoginModal(true); // Show login modal
    }
  };

  const addToWishlistHandler = async () => {
    if (userInfo) {
      try {
        await dispatch(addTowishlist(product._id, qty));
      } catch (error) {
        alert('Failed to add item to wishlist. Please try again.');
      }
    } else {
      setShowLoginModal(true); // Show login modal
    }
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (editReviewId) {
      dispatch(updateProductReview(match.params.id, editReviewId, { rating, comment }))
        .then(() => {
          dispatch(listProductDetails(match.params.id));
          resetForm();
        });
    } else {
      dispatch(createProductReview(match.params.id, { rating, comment }))
        .then(() => {
          dispatch(listProductDetails(match.params.id));
          resetForm();
        });
    }
  };

  const handleEditReview = (review) => {
    setEditReviewId(review._id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId); 
    setShowDeleteModal(true); 
  };

  const confirmDeleteReview = () => {
    if (reviewToDelete) {
      dispatch(deleteProductReview(match.params.id, reviewToDelete));
      setShowDeleteModal(false); 
    }
  };

  const cancelDeleteReview = () => {
    setShowDeleteModal(false); 
    setReviewToDelete(null); 
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false); 
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false); 
  };

  const incrementQty = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <>
      <Button onClick={history.goBack} variant="light" className="mb-3">
        <i className="fas fa-arrow-left mr-2"></i> Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>
                      <Rating value={product.rating} />
                    </Col>
                    <Col md={6}>
                      <span>No. of Reviews: {product.numReviews}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
              <Card className="mt-3">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Quantity:
                        </Col>
                        <Col className="qty-display d-flex align-items-center justify-content-center">
                          <Button variant="light" onClick={decrementQty} disabled={qty <= 1}>
                            <FontAwesomeIcon icon={faMinus} />
                          </Button>
                          <span className="qty-number mx-3">{qty}</span>
                          <Button variant="light" onClick={incrementQty} disabled={qty >= product.countInStock}>
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </Col>               
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          className="btn-block"
                          onClick={addToCartHandler}
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add to Cart
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-block"
                          onClick={addToWishlistHandler}
                          type="button"
                        >
                          Add to Wishlist
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Review Section */}
          <Row className="mt-4">
            <Col md={6}>
              <Card className="p-4 mb-4 shadow-sm">
                <h2 className="mb-3">Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                
                {/* Review container with fixed height and scroll */}
                <div className="review-container">
                  <ListGroup variant="flush">
                    {/* Render all reviews directly */}
                    {product.reviews
                      .sort((a, b) => (userInfo && a.user === userInfo._id ? -1 : 1))
                      .map((review) => (
                        <ListGroup.Item key={review._id} className="border-0 mb-3">
                          <div className="p-3 border rounded bg-light">
                            <div>
                              <strong>{review.name}</strong>
                            </div>
                            <div className="d-flex align-items-center mt-1">
                              <Rating value={review.rating} />
                              {userInfo && userInfo._id === review.user && (
                                <>
                                  <Button
                                    variant="link"
                                    onClick={() => handleEditReview(review)}
                                    className="ed-button ml-2"
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Button>
                                  <Button
                                    variant="link"
                                    onClick={() => handleDeleteReview(review._id)}
                                    className="ed-button text-danger ml-2"
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </>
                              )}
                            </div>
                            <small className="text-muted">{review.createdAt.substring(0, 10)}</small>
                            <p className="mt-2 review-comment">{review.comment}</p>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </div>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-3">
                <h2>{editReviewId ? 'Edit Your Review' : 'Write a Customer Review'}</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitReviewHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mb-3"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-3"
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="btn-block">
                      {editReviewId ? 'Update' : 'Submit'}
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">Log-in</Link> to write a Review
                  </Message>
                )}
              </Card>
            </Col>
          </Row>

          {/* Success Modal for Reviews */}
          <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{successMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSuccessModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Review Modal */}
          <Modal show={showDeleteModal} onHide={cancelDeleteReview}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelDeleteReview}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDeleteReview}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Login Modal */}
          <Modal show={showLoginModal} onHide={handleLoginModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Please Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>You need to log in to add items to the cart or wishlist.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleLoginModalClose}>
                Close
              </Button>
              <Link to="/login">
                <Button variant="primary">Log In</Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductScreen;
