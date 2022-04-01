import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux"; 
import { listProducts, deleteProductAction } from '../redux/actions/productActions';
import { Link } from 'react-router-dom'

const AdminProductListScreen = (props) =>{

    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.productList)
    const { loggedIn, userInfo } = useSelector(state => state.userLogin)
    const { deleteLoading, deleteSuccess, deleteError} = useSelector(state => state.deleteProduct)

    function createProductHandler(){}

    function deleteHandler(id){
        if(window.confirm('Are you sure you want to delete this product')){
            dispatch(deleteProductAction(id))
        }
        
    }

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            props.history.push('/login')
        }
    },[dispatch,loggedIn,props.history, userInfo, deleteSuccess])

    return(
        <div>
            <Row>
                <Col>
                    <h1>Products</h1>
                
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {deleteLoading && <Loader />}
            {deleteError && <Message variant="warning">{deleteError}</Message>}

            {loading
                ? <Loader />
                : error
                ? <Message variant="info">{error}</Message>
                : userInfo.isAdmin
                ? (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>BRAND</th>
                                    <th>Category</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product =>(
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                <Button className="btn-sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id) }>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )
            : <Message variant="warning">Page only acessible to admins</Message>
            }
        </div>
    )
}
export default AdminProductListScreen