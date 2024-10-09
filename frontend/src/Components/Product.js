import React, { useState } from 'react';
import { Card, Badge } from "react-bootstrap";
import Rating from "../Components/Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const defaultCardStyle = {
        transition: 'transform 0.2s ease',
        transform: 'scale(1)',
    };

    const hoverCardStyle = {
        transform: 'scale(1.05)',
    };

    const cardStyle = isHovered ? hoverCardStyle : defaultCardStyle;

    // Styles for the fixed-size image
    const imageStyle = {
        width: '100%', // Ensures the image takes the full width of the container
        height: '200px', // Fixed height
        objectFit: 'cover', // Ensures the image covers the container without distortion
    };

    return (
        <Card
            className="my-3 p-3 rounded border-0 shadow"
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img 
                    src={product.image} 
                    variant="top" 
                    className="rounded-top" 
                    style={imageStyle} // Apply the fixed size style
                />
            </Link>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Title as="div" className="mb-2" style={{ height: '3rem', overflow: 'hidden' }}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <div>
                    <Card.Text as="div" className="mb-2">
                        <Rating value={product.rating} />
                    </Card.Text>
                    <Card.Text as="div" className="mb-2">
                        {`${product.numReviews} reviews`}
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
