import React from 'react';
import { Card, Badge } from "react-bootstrap";
import Rating from "../Components/Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded border-0 shadow">
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img src={product.image} variant="top" className="rounded-top" />
            </Link>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Title as="div" className="mb-2">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <div>
                    <Card.Text as="div" className="mb-2">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as="h5" className="mb-3">
                        <Badge pill bg="info">${product.price}</Badge>
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;
