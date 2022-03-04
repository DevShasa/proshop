import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/userConstants'

const config = {
    headers:{'Content-type':'application/json'}
}

export const Login = (email, password) =>
    async (dispatch) =>{
        try{
            dispatch({
                type: USER_LOGIN_REQUEST
            })

            const response =  await axios.post(
                    '/api/users/login/', 
                    {'username': email, 'password': password}, 
                    config
                )

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response.data
            })

            localStorage.setItem('userInfo', JSON.stringify(response.data))

        }catch(error){
            dispatch({
                type:USER_LOGIN_FAIL,
                payload: error.response && error.response.data.detail 
                    ? error.response.data.detail 
                    : error.message,
            })
        }
    }

export const logout = () => (dispatch) =>{
    // Remove item from localstorage 
    // then dispatch logout command to reducer
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}


export const register = (name, email, password) => {
    return async(dispatch) =>{
        try{
            dispatch({type: USER_REGISTER_REQUEST})

            const response = await axios.post(
                '/api/users/register/', 
                { 'email':email, 'name': name,'password': password}, 
                config 
            )
            // Register the user
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: response.data
            })
            // Log in the user 
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response.data
            })
        }catch(error){
            dispatch({
                type:USER_REGISTER_FAIL,
                payload: error.response && error.response.data.detail 
                    ? error.response.data.detail 
                    : error.message,
            })
        }
    }
}
