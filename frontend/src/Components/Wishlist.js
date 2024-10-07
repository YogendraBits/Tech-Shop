import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getwishlist, removeFromwishlist } from '../actions/wishlistActions';
import Loader from './Loader';
import Message from './Message';

const wishlist = () => {
    const dispatch = useDispatch();

    const wishlist = useSelector(state => state.wishlist);
    const { wishlist: items, loading, error } = wishlist;

    useEffect(() => {
        dispatch(getwishlist());
    }, [dispatch]);

    const handleRemoveFromwishlist = (productId) => {
        dispatch(removeFromwishlist(productId));
    };

    return (
        <div>
            <h1>Your wishlist</h1>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <ul>
                    {items.map(item => (
                        <li key={item._id}>
                            <p>{item.name}</p>
                            <button onClick={() => handleRemoveFromwishlist(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default wishlist;
