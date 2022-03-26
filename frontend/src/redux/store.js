 import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {  productListReducer, productDetailReducer, } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer,
        adminUserListReducer 

    } from './reducers/userReducers';
import  { 
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    userOrderList,
} from './reducers/orderReducers';

const middleware = [thunk]
const reducer  = combineReducers({
        productList: productListReducer, 
        productDetail: productDetailReducer,
        cart: cartReducer, 
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdate: userUpdateProfileReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        userOrders: userOrderList,
        adminUserDisplay: adminUserListReducer
        
})

const cart_from_localStorage = localStorage.getItem('cartItems')
                                //convert into object
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : [] 

                                
const user_from_localStorage = localStorage.getItem('userInfo')
                                //convert into object
                                ? JSON.parse(localStorage.getItem('userInfo'))
                                : null

const shipping_from_localStorage = localStorage.getItem('shippingAddress')
                                    //convert into object
                                    ? JSON.parse(localStorage.getItem('shippingAddress'))
                                    : {}

const payment_from_localstorage = localStorage.getItem('paymentMethod')
                                    ? JSON.parse(localStorage.getItem('paymentMethod'))
                                    : ''

const initialState = {
    cart: { 
        cartItems: cart_from_localStorage, 
        shippingAddress: shipping_from_localStorage,
        paymentMethod: payment_from_localstorage,
    },
    userLogin: {userInfo: user_from_localStorage}
}
const store  = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store 