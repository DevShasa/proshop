import {
    CART_ADD_ITEM,
    // CART_REMOVE_ITEM
} from '../constants/cartConstants';

export const cartReducer = (state = {cartItems:[]}, action) =>{
    

    switch(action.type){
        case CART_ADD_ITEM:
            // item looks something like this 
            //  {product: "product_name", data:{id:1, name:"prd1"}}
            const action_item = action.payload
            // if item exists it is loaded into  item_if_exists
            const item_if_exists = state.cartItems.find(x => x.product === action_item.product)

            if(item_if_exists){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product  === item_if_exists.product 
                            ? action_item
                            : x 
                    )
                }
            }else{
                return {
                    ...state, 
                    cartItems:[...state.cartItems, action_item]
                } 
            }
        default:
            return state
    }
}