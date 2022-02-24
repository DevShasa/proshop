import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'; 
import { addToCart } from '../redux/actions/cartActions';

const CartScreen = ({ match, location, history })=>{
    const productId = match.params.id
    const quantity = location.search 
                        ? parseInt(location.search.split('=')[1]) 
                        : 1

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    console.log( cartItems )

    useEffect(()=>{
        if(productId){
            // Create a new product
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    return (
        <div>
            Cart
        </div>
    )
}
export default CartScreen