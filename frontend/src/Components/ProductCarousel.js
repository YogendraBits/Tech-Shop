import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselStyles.css'; // Import the custom CSS

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    const renderTopReview = (product) => {
        if (product.reviews.length > 0) {
            const topReview = product.reviews[0];
            return (
                <p style={{ ...styles.review, color: '#000' }}><strong>Top Review:</strong> {topReview.comment}</p>
            );
        }
        return <p style={{ ...styles.review, color: '#000' }}>No Reviews</p>;
    };

    return (
        <div style={styles.carouselContainer}>
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
                >
                    {products.map((product) => (
                        <div key={product._id} style={styles.carouselItem}>
                            <Link to={`/product/${product._id}`} style={styles.link}>
                                <div style={styles.contentContainer}>
                                    <h2 style={styles.title}>{product.name}</h2>
                                    <p style={{ ...styles.price, color: '#000' }}>Price: ${product.price}</p>
                                    {renderTopReview(product)}
                                </div>
                                <div style={styles.imageContainer}>
                                    <img src={product.image} alt={product.name} style={styles.image} />
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

const styles = {
    carouselContainer: {
        marginBottom: '20px',
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
    },
    contentContainer: {
        flex: '1',
        textAlign: 'left',
        padding: '10px',
        color: '#fff', // White color for text
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '5px',
    },
    price: {
        fontSize: '1rem',
        margin: '0',
    },
    review: {
        fontSize: '1rem',
        margin: '0',
    },
    imageContainer: {
        flex: '1',
        marginLeft: '20px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
        borderRadius: '10px',
    },
};
