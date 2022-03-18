import React, { useEffect } from 'react';
import {Row, Col, ListGroup, Image, Card } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import Message from '../components/Message';
import Loader from '../components/Loader';

import { getOrderDetails } from "../redux/actions/orderActions";

const OrderScreen = (props)=>{

    const orderId = props.match.params.id
    const dispatch = useDispatch()
    const { loading, error, order } = useSelector(state=> state.orderDetails)

    if(!loading && !error){
        order.itemsPrice = order.orderItems
        .reduce((accumulator, item)=> accumulator + item.price * item.qty, 0)
        .toFixed(2)
    }
    
    useEffect(()=>{
        if(!order || order._id !== Number(orderId)){
            // order does not exist
            // order exists in redux but does not match oderId 
            dispatch(getOrderDetails(orderId))
        }
        
    },[dispatch,orderId])

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
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>)
}
export default OrderScreen 
