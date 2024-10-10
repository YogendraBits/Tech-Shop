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
          return { ...state, wishlistitems: action.payload }; // Update with new list
      
      case WISHLIST_REMOVE_ITEM:
          return {
              ...state,
              wishlistitems: state.wishlistitems.filter(item => item._id !== action.payload),
          };
        
      default:
          return state;
  }
};

