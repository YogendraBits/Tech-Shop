import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProductCreateScreen.css';

const ProductCreateScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const { loading, error, success } = useSelector((state) => state.productCreate);

  useEffect(() => {
    if (success) {
      navigate('/admin/productlist');
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : formData.image;

    dispatch(createProduct({ ...formData, image: imageUrl }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prevData) => ({ ...prevData, image: file.name }));

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData((prevData) => ({ ...prevData, image: '' }));

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="product-create-container">
      <h1>Create Product</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Card className="shadow p-4">
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control-file"
                  ref={fileInputRef}
                />
                {imagePreview && (
                  <>
                    <img src={imagePreview} alt="Preview" className="img-preview mt-2" />
                    <Button variant="danger" className="mt-2" onClick={handleImageDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter count in stock"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">Create</Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProductCreateScreen;
