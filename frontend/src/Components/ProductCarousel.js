import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductCarousel.css'; // Import the custom CSS

const ProductCarousel = () => {
    const dispatch = useDispatch();
    const [isMounted, setIsMounted] = useState(true);
    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        setIsMounted(true);
        dispatch(listTopProducts()).then(() => {
            if (!isMounted) return; // Prevent state updates if not mounted
        });
        return () => {
            setIsMounted(false); // Set mounted state to false when unmounting
        };
    }, [dispatch]);

    const renderTopReview = (product) => {
        if (product.reviews.length > 0) {
            const topReview = product.reviews[0];
            return (
                <p className="review"><strong>Top Review:</strong> {topReview.comment}</p>
            );
        }
        return <p className="review">No Reviews</p>;
    };

    return (
        <div className="carouselContainer">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Carousel 
                    showArrows={true} 
                    showStatus={false} 
                    swipeable={true} 
                    emulateTouch={true} 
                    infiniteLoop={true} 
                    autoPlay={true} 
                    interval={5000} 
                    stopOnHover={true} 
                    dynamicHeight={true}
                    showThumbs={false}
                >
                    {products.map((product) => (
                        <div key={product._id} className="carouselItem">
                            <Link to={`/product/${product._id}`} className="link">
                                <div className="contentContainer">
                                    <h2 className="title">{product.name}</h2>
                                    <p className="price">Price: ${product.price}</p>
                                    {renderTopReview(product)}
                                </div>
                                <div className="imageContainer">
                                    <img src={product.image} alt={product.name} className="image" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default ProductCarousel;
