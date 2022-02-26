import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart= (id, quantity) => async(dispatch, getState) =>{
    const response =  await axios.get(`/api/products/${id}`)

    // yeet the data cartReducer
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: response.data._id, 
            name: response.data.name,
            image: response.data.image,
            price: parseFloat(response.data.price),
            countInStock: response.data.countInStock,
            qty: Number(quantity) 
        }
    })

    // Save data into localstorage 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (p_id) => 
    async(dispatch, getState)=>{
        // This will update state
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: p_id
        })

        // Update localstorage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }


