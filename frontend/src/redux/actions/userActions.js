import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants'

const config = {
    headers:{'Content-type':'application/json'}
}

export const login = (email, password) =>
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

        }catch(error){
            dispatch({
                type:USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
            })
        }
    }