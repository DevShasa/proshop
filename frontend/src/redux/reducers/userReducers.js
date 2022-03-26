import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET
} from '../constants/userConstants'

export const userLoginReducer = ( state={}, action) =>{
    // state = {loading, userinfo, error}
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true }
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state={}, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userDetailsReducer = (state = {user:{} }, action)=>{
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {...state, loading: true}
        case USER_DETAIL_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_DETAIL_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, userInfo: action.payload, success:true}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const adminUserListReducer = (state = {adminUserList:[]}, action )=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {
                adminUserListLoading: true
            }
        case USER_LIST_SUCCESS:
            return {
                adminUserListLoading: false,
                adminUserList: action.payload
            }
        case USER_LIST_FAIL:
            return {
                adminUserListLoading: false,
                adminUserRequestError: action.payload
            }
        case USER_LIST_RESET:
            return {
                adminUserList:[]
            }
        default:
            return state
    }
}