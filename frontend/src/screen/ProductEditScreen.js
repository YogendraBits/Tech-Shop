import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import './ProductEditScreen.css';

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <div className="form-container">
        <h1 className="form-title">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="product-edit-form">
            <div className="form-row">
              <Form.Group controlId='name' className="form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='price' className="form-group">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId='image' className="form-group">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='brand' className="form-group">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand name'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId='countInStock' className="form-group">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter available stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='category' className="form-group">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
            </div>

            <Form.Group controlId='description' className="form-group">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                placeholder='Enter product description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className="update-btn">
              Update
            </Button>
          </Form>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
