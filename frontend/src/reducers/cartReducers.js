import {CART_ADD_ITEM , CART_UPDATE_ITEM,CART_LOAD_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'

const initialState = {
    cartItems: [],
};


export const cartReducer=(state = {cartItems :[], shippingAddress :{}}, action)=>{
    switch (action.type){
        case CART_LOAD_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };

        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem =state.cartItems.find((x)  => x.product === item.product);

            if(existItem){
                return {
                    ...state,

                     cartItems:state.cartItems.map( (x) => x.product === existItem.product ? item : x )
                }
            } else{
                return{
                    ...state,
                    cartItems: [...state.cartItems , item ]
                }
            };

            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(
                        (item) => item._id !== action.payload // Use item ID for filtering
                    ),
                };
            case CART_UPDATE_ITEM:
                    return {
                        ...state,
                        cartItems: state.cartItems.map(item =>
                            item._id === action.payload._id ? action.payload : item
                        ),
                    };

            case CART_SAVE_SHIPPING_ADDRESS:
                    return{ 
                        ...state,
                        shippingAddress: action.payload,
                    }
                    case CART_SAVE_PAYMENT_METHOD:
                        return{ 
                            ...state,
                            paymentMethod: action.payload,
                        }
            default :
             return state
    }
}