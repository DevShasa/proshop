import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {  productListReducer, productDetailReducer, } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';


const middleware = [thunk]
const reducer  = combineReducers({
        productList: productListReducer, 
        productDetail: productDetailReducer,
        cart: cartReducer
})

const cart_from_localStorage = localStorage.getItem('cartItems')
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : [] 
                                    

const initialState = {
    cart: { cartItems: cart_from_localStorage }
}
const store  = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store 