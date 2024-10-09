import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  const [editReviewId, setEditReviewId] = useState(null); // Track which review is being edited
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [reviewToDelete, setReviewToDelete] = useState(null); // Track which review is selected for deletion
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success message modal
  const [successMessage, setSuccessMessage] = useState(''); // Message to display in success modal

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
    if (successProductReview) {
      setSuccessMessage('Review Submitted!'); // Set the success message
      setShowSuccessModal(true); // Show the success modal
      resetForm();
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (successDeleteReview) {
      setSuccessMessage('Review Deleted!');
      setShowSuccessModal(true); // Show the success modal after deletion
      dispatch({ type: PRODUCT_DELETE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview, successDeleteReview]);

  const resetForm = () => {
    setEditReviewId(null);
    setRating(0);
    setComment('');
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
  };

  const addToWishlistHandler = async () => {
    if (userInfo) {
      try {
        await dispatch(addTowishlist(product._id, qty));
      } catch (error) {
        alert('Failed to add item to wishlist. Please try again.');
      }
    } else {
      alert('Please log in to add items to your wishlist.');
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
    setReviewToDelete(reviewId); // Set the review ID to delete
    setShowDeleteModal(true); // Show the modal
  };

  const confirmDeleteReview = () => {
    if (reviewToDelete) {
      dispatch(deleteProductReview(match.params.id, reviewToDelete));
      setShowDeleteModal(false); // Close the delete confirmation modal
    }
  };

  const cancelDeleteReview = () => {
    setShowDeleteModal(false); // Close the delete confirmation modal
    setReviewToDelete(null); // Clear the review ID
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false); // Close the success modal
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
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
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
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className="border-0 mb-3">
                      <div className="p-3 border rounded bg-light">
                        <div>
                          <strong>{review.name}</strong>
                        </div>
                        <div className="d-flex align-items-center mt-1"> {/* Flex container for stars, edit, and delete buttons */}
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
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
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
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </Card>
            </Col>
          </Row>

          {/* Delete Confirmation Modal */}
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

          {/* Success Message Modal */}
          <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{successMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSuccessModalClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductScreen;
