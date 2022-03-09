import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {  productListReducer, productDetailReducer, } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer } from './reducers/userReducers';


const middleware = [thunk]
const reducer  = combineReducers({
        productList: productListReducer, 
        productDetail: productDetailReducer,
        cart: cartReducer, 
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdate: userUpdateProfileReducer

})

const cart_from_localStorage = localStorage.getItem('cartItems')
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : [] 

                                
const user_from_localStorage = localStorage.getItem('userInfo')
                                ? JSON.parse(localStorage.getItem('userInfo'))
                                : null

const initialState = {
    cart: { cartItems: cart_from_localStorage },
    userLogin: {userInfo: user_from_localStorage}
}
const store  = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store 