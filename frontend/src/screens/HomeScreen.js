import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions';

const HomeScreen = () =>{

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList )
    const {error, loading, products} = productList

    useEffect(()=>{
        dispatch(listProducts())
    }, [dispatch])

    return(
        <div>
            <h1>Latest Products</h1>
            {loading 
                ? <Loader />  // if loading is true do this 
                : error // if loading is false, check whether there is an error
                ? <Message variant ="danger" >{error}</Message>
                // if there is no error
                :   <Row> 
                        {products.map(p =>(
                            <Col sm={12} md={6} lg={4} xl={3} 
                                key={p._id}
                            >
                                <Product product={p} />
                            </Col>
                        ))}
                    </Row>
            }

        </div>
    )
}
export default HomeScreen;