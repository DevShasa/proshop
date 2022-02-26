import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form, } from 'react-bootstrap'
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetail } from '../redux/actions/productActions';
import { addToCart} from '../redux/actions/cartActions';

import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match, history }) =>{
    const [quantity, setQuantity] = useState(1)

    const dispatch  = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const { loading , error, product } = productDetail

    useEffect(()=>{
        dispatch(listProductDetail(match.params.id))
    }, [match.params.id, dispatch]) 

    const addToCartHandler =()=>{
        dispatch(addToCart(match.params.id, quantity))
        // history.push(`/cart/${match.params.id}?qty=${quantity}`)
        history.push(`/cart`)
    }

    return(
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {loading
                ? <Loader />
                : error 
                ? <Message variant ="danger" >{error}</Message>
                : <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">

                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3} className="mt-4">
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock' }</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col className="my-1">
                                                    <Form.Control
                                                        as = "select"
                                                        value = {quantity}
                                                        onChange = {(e) => setQuantity(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) =>(
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item> 
                                    )}
                                    <ListGroup.Item>
                                        <Button 
                                        onClick = {addToCartHandler}
                                        className="btn btn-block" 
                                        style={{width: '100%'}} 
                                        type="button"
                                        disabled = {product.countInStock === 0}
                                        >
                                            Add to Cart
                                        </Button> 
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </div>
    )
}
export default ProductScreen;