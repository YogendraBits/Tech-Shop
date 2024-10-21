import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Badge} from "react-bootstrap";
import Rating from "../Components/Rating";
import { Link } from "react-router-dom";
import './Product.css'; // Import the CSS file
import { Helmet } from 'react-helmet';

// Skeleton loader component
const SkeletonLoader = () => (
    <Card className="my-3 p-3 shadow product-card">
        <div className="skeleton-image" style={{ height: '200px', backgroundColor: '#e0e0e0', borderRadius: '0.25rem' }} />
        <Card.Body>
            <div className="skeleton-title" style={{ height: '1.5rem', backgroundColor: '#e0e0e0', marginBottom: '0.5rem' }} />
            <div className="skeleton-rating" style={{ height: '1rem', backgroundColor: '#e0e0e0', marginBottom: '0.5rem' }} />
            <div className="skeleton-reviews" style={{ height: '1rem', backgroundColor: '#e0e0e0', marginBottom: '0.5rem' }} />
            <div className="skeleton-price" style={{ height: '1.5rem', backgroundColor: '#e0e0e0' }} />
        </Card.Body>
    </Card>
);

const Product = memo(({ product }) => {
    const { _id, image, name, rating, numReviews, price } = product;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate data fetching (e.g., with a timeout)
                await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate a network delay
                setLoading(false);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return <div>Error loading product: {error}</div>;
    }

    return (
        <>
            <Helmet>
                <title>{name} - Your Store</title>
                <meta name="description" content={`Buy ${name} for $${price}.`} />
            </Helmet>
            <Card className="my-3 p-3 shadow product-card">
                <Link to={`/product/${_id}`} className="text-decoration-none text-inherit">
                    <Card.Img 
                        src={image} 
                        alt={name} 
                        variant="top" 
                        className="rounded-top product-image" 
                        loading="lazy" 
                    />
                    <Card.Title as="div" className="mb-2 product-title">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Text as="div" className="mb-2">
                        <Rating value={rating} />
                    </Card.Text>
                    <Card.Text as="div" className="mb-2">
                        {`${numReviews} reviews`}
                    </Card.Text>
                    <Card.Text as="h5" className="mb-3 product-price">
                        <Badge pill bg="info">${price}</Badge>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
});

Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        numReviews: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default Product;
