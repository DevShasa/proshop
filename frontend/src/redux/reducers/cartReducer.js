import {
    CART_ADD_ITEM,
    // CART_REMOVE_ITEM
} from '../constants/cartConstants';

export const cartReducer = (state = {cartItems:[]}, action) =>{
    switch(action.TYPE){
        case CART_ADD_ITEM:
            // item looks something like this 
            //  {product: "product_name", data:{id:1, name:"prd1"}}
            const item = action.payload
            // if item exists it is loaded into  existitem
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                // If item is in cart 
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => x.product  === existItem.product ? item : x)
                }
            }else{
                // If item does not exist in cart 
                return {
                    ...state, 
                    cartItems:[...state.cartItems, item]
                } 
            }
        default:
            return state
    }
}