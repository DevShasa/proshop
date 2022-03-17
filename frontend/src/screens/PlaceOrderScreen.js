import React, { useEffect } from 'react';
import {Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";

const PlaceOrderScreen = (props)=>{

    const { order, error, loading, success } = useSelector(state=> state.orderCreate)

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const itemsPrice = cart.cartItems
                            .reduce((accumulator, item)=> accumulator + item.price * item.qty, 0)
                            .toFixed(2)
    const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice = ((0.082)* itemsPrice).toFixed(2)
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    if(!cart.paymentMethod){
        props.history.push('/payment')
    }

    useEffect(()=>{
        if(success){
            props.history.push(`/order/${order._id}`)
            // Order has been creates successfully therefore clear orderCreducer
            dispatch({type: ORDER_CREATE_RESET})
        }
    },[success, props.history])

    const placeOrder = ()=>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            paymentMethod: cart.paymentMethod,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
            shippingAddress: {...cart.shippingAddress, shippingPrice:shippingPrice}
        }))
    }

    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}{', '}
                                {cart.shippingAddress.city}{', '}
                                {cart.shippingAddress.postalCode}{', '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Pay Via: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 
                                ? <Message variant="info">Your Cart is Empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index)=>(
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <h2>Totals</h2>
                    <Card className='mt-4'>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Order summary
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {error &&(
                                <ListGroup.Item>
                                    <Message variant='danger'>{error}</Message>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    style = {{width: '100%'}}
                                    disabled = {cart.cartItems===0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default PlaceOrderScreen 
