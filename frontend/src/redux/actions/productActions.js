import axios from 'axios';
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch)=> {
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const response = await axios.get('/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: response.data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                        ? error.response.data.detail 
                        : error.message ,
        })
    }
}

export const listProductDetail = (id) =>
    async (dispatch) =>{
        try{
            dispatch({
                type: PRODUCT_DETAIL_REQUEST
            })

            const response = await axios.get(`/api/products/${id}`)
            dispatch({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: response.data
            })
        } catch (error){
            dispatch({
                type:PRODUCT_DETAIL_FAIL,
                payload: error.response && error.response.data.message 
                // return Response({'detail': 'No Order Items'},  status=status.HTTP_400_BAD_REQUEST)
                    ? error.response.data.detail 
                    : error.message ,
            })
        }
    }

export const deleteProductAction = (id) =>{
    return async(dispatch, getState) =>{
        try{
            dispatch({type:PRODUCT_DELETE_REQUEST})

            const { userLogin:{userInfo:{token}} } = getState()
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            const response = await axios.delete(
                `/api/products/delete/${id}`,
                config
            )

            dispatch({
                type:PRODUCT_DELETE_SUCCESS,
                payload: response.data
            })

        }catch(error){
            dispatch({
                type:PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.response
            })
        }
    }
}

export const createProductAction = () => async (dispatch, getState) => {
    try{
        dispatch({type:PRODUCT_CREATE_REQUEST})

        const { userLogin:{userInfo:{token}} } = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const response = await axios.post( `/api/products/create/`, {}, config )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: response.data
        })

    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.response
        })
    }
}