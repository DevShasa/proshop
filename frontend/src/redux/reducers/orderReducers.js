import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    FETCH_ORDER_DETAILS_REQUEST,
    FETCH_ORDER_DETAILS_SUCCESS,
    FETCH_ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,
} from '../constants/orderConstants'
import { USER_LOGOUT } from "../constants/userConstants"

export const orderCreateReducer = (state={order: {}}, action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading:false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {
                order: {}
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state={loading:true }, action) => {
    switch (action.type){
        case FETCH_ORDER_DETAILS_REQUEST:
            return {
                ...state,
            }
        case FETCH_ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order: action.payload
            }
        case FETCH_ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) =>{
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return{
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return{
                loading:false,
                success: true
            } 
        case ORDER_PAY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const userOrderList = (state ={ordersList:[]}, action )=>{
    switch(action.type){
        case LIST_MY_ORDER_REQUEST:
            return{
                ordersLoading: true
            }
        case LIST_MY_ORDER_SUCCESS:
            return{
                ordersLoading: false,
                ordersList: action.payload
            }
        case LIST_MY_ORDER_FAIL:
            return{
                ordersLoading: false,
                ordersError: action.payload
            }
        case USER_LOGOUT:
            return{
                ordersList:[]
            }
        default:
            return state
    }
}