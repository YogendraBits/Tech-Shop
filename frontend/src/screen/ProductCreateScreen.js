import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import './ProductCreateScreen.css'; // Import your custom CSS file

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fileInputRef = useRef(); // Create a ref for the file input

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if (success) {
      history.push('/admin/productlist');
    }
  }, [success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : image;

    dispatch(createProduct({ name, price, image: imageUrl, brand, category, countInStock, description }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(file.name);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setImagePreview('');
    setImage('');
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  ref={fileInputRef} // Attach the ref to the input
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
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
