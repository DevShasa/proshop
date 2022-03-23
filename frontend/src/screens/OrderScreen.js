import React, { useEffect, useState } from 'react';
import {Row, Col, ListGroup, Image, Card } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2"
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants"

const PAYPAL_CLIENT_ID = "AcQ-Z7_7RH0QhOQabNf5c8QHIeJNr2FCpnNfshsePVofyfzOkbMI88QpjS5WNu7rz0ZTfCi_2G5N1Drk"

const OrderScreen = (props)=>{

    // const [ sdkReady, setSdkReady ] = useState(false)

    const orderId = props.match.params.id
    const dispatch = useDispatch()
    const { loading, error, order } = useSelector(state=> state.orderDetails)

    const  orderPay = useSelector(state=> state.orderPay)

    if(!loading && !error){
        // Make the calculations only when there is an orderitem 
        order.itemsPrice = order.orderItems
        .reduce((accumulator, item)=> accumulator + item.price * item.qty, 0)
        .toFixed(2)
    }

    const addPaypalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.source = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
        script.async = true
        // script.onload = () =>{ setSdkReady(true) }
        document.body.appendChild(script)
    }

    useEffect(()=>{
        if(!order || orderPay.success ||order._id !== Number(orderId)){
            // order does not exist
            // order exists in redux but does not match oderId
            // order has been sucessfuly paid
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            // order has not been paid
            if(!window.paypal){
                // if the paypal window is not present
                addPaypalScript()
            // }else{
            //     // if the window is present 
            //     setSdkReady(true)
            // }
            }
        }
    },[dispatch,orderId, order, orderPay.success])

    // update order to paid and update orderpay.success
    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading 
            ? <Loader />
            : error
            ? <Message variant ="danger" >{error}</Message>
            :(
            <div>
                <h1>Order Number: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                                <p>
                                    <strong>Shipping: </strong>
                                    {order.shippingAddress.address}{', '}
                                    {order.shippingAddress.city}{', '}
                                    {order.shippingAddress.postalCode}{', '}
                                    {order.shippingAddress.country}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Pay Via: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid 
                                    ? ( <Message variant="success">Paid on {order.paidAt}</Message>)
                                    : (<Message variant="warning">Not Paid</Message>)
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 
                                    ? <Message variant="info">Your order is Empty</Message>
                                    : (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map((item, index)=>(
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
                                            {order.isDelivered 
                                                ? ( <Message variant="success">Delivered on {order.deliveredAt}</Message>)
                                                : (<Message variant="warning">Not Delivered</Message>)
                                            }
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
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping: </Col>
                                        <Col>${order.shippingAddress.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax: </Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total: </Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid &&(
                                    <ListGroup.Item>
                                        {orderPay.loading && <Loader/>}

                                        <PayPalButton 
                                            amount = {order.totalPrice}
                                            onSuccess = {successPaymentHandler} 
                                        />
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>)
}
export default OrderScreen
