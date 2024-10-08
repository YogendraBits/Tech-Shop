import { WISHLIST_REQUEST, WISHLIST_SUCCESS, WISHLIST_FAIL,WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from '../constants/wishlistConstants';

const initialState = {
  loading: true,
  error: null,
  wishlistitems: [], // Start with an empty array
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_REQUEST:
        return { ...state, loading: true };
    case WISHLIST_SUCCESS:
        return { loading: false, wishlistitems: action.payload };
    case WISHLIST_FAIL:
        return { loading: false, error: action.payload };
    
    case WISHLIST_ADD_ITEM:
      const newItem = action.payload; // This now contains the updated list of wishlist items from the API response

      // Check if the new item already exists in the wishlist
      const exists = state.wishlistitems.find(x => x.productId === newItem.productId); // Ensure this matches your schema

      if (exists) {
        return {
          ...state,
          wishlistitems: state.wishlistitems.map(x => 
            x.productId === exists.productId ? { ...x, quantity: newItem.quantity } : x // Update the existing item
          ),
        };
      } else {
        return {
          ...state,
          wishlistitems: [...state.wishlistitems, newItem], // Add the new item
        };
      }
      
    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishlistitems: state.wishlistitems.filter(x => x.product !== action.payload), // Remove item by product ID
      };

    default:
      return state; // Return the current state if no actions match
  }
};
