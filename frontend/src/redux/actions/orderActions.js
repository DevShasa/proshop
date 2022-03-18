import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    FETCH_ORDER_DETAILS_REQUEST,
    FETCH_ORDER_DETAILS_SUCCESS,
    FETCH_ORDER_DETAILS_FAIL
} from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

export const createOrder = (order_object) =>{
    return async(dispatch, getState) =>{
        try{
            dispatch({
                type: ORDER_CREATE_REQUEST
            })

            // Get the user's token ans create header
            const { userLogin:{userInfo:{token}} } = getState()
            const config = {
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${token}`
                }}

            // Send the data
            const response = await axios.post(
                '/api/orders/add/',
                order_object,
                config
            )

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: response.data
            })

            dispatch({
                type: CART_CLEAR_ITEMS,
            })
            localStorage.removeItem("cartItems")
        
        }catch(error){
            dispatch({
                type:ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.detail 
                    ? error.response.data.detail 
                    : error.message,
            })
        }
    }
}
export const getOrderDetails = (id) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch({type:FETCH_ORDER_DETAILS_REQUEST})

            const {userLogin:{userInfo:{token}}} = getState()
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            const response = await axios.get(`/api/orders/${id}`,config)
            dispatch({
                type:FETCH_ORDER_DETAILS_SUCCESS,
                payload: response.data
            })
            console.log(response.data)

        }catch(error){
            dispatch({
                type:FETCH_ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.detail 
                    ? error.response.data.detail 
                    : error.message,
            })
        }
    }
}