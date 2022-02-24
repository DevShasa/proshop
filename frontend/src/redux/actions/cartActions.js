import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart= (id, quantity) => async(dispatch, getState) =>{
    const response =  await axios.get(`/api/products/${id}`)

    // yeet the data cartReducer
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: response.data._id, 
            name: response.data.name,
            image: response.data.image,
            price: response.data.price,
            countInStock: response.data.countInStock,
            qty: quantity 
        }
    })

    // Save data into localstorage 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
} 