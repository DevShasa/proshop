import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { listProductDetail, editProductAction } from '../redux/actions/productActions';
import { PRODUCT_EDIT_RESET } from '../redux/constants/productConstants';

const ProductEditScreen = (props) =>{

    const productID = props.match.params.id
    
    const [ name, setName ] = useState("")
    const [ brand, setBrand ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ price, setPrice ] = useState(0)
    const [ countInStock, setCountInStock ] = useState(0)
    const [ image, setImage ] = useState("")
    const [ adminError, setAdminError ] = useState(false)

    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, product, error } = useSelector(state => state.productDetail)
    const { editSuccess } = useSelector(state=> state.editProduct)

    useEffect(()=>{
        if(!userInfo){
            // is user loggedin? 
            props.history.push(`/login?redirect=admin/product/${productID}/edit`)
        }else {
            // is user an admin? 
            if(!userInfo.isAdmin){
                setAdminError(true)
            }else{
                // product exists and matches the id passed in url
                if(!product.name || product._id !== Number(productID) || editSuccess){
                    dispatch(listProductDetail(productID))
                    dispatch({type: PRODUCT_EDIT_RESET})

                }else{
                    setName(product.name)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setDescription(product.description)
                    setPrice(product.price)
                    setCountInStock(product.countInStock)
                    setImage(product.image)
                }
            }
        }
    },[product, dispatch,productID, props, userInfo, editSuccess])

    function submitHandler(e){
        e.preventDefault()
        const newData = {
            name,
            brand, 
            category, 
            image, 
            price, 
            countInStock: Number(countInStock), 
            description
        }
        // console.log(newData)
        dispatch(editProductAction(productID, newData))
    }

    return(
        <div>
            <h1>Edit Product</h1>
            <Link to="/admin/productlist">go back</Link>
            {loading
                ? <Loader />
                : error
                ? <Message variant = "danger">{error}</Message>
                : adminError
                ? <Message variant = "danger">Not Authorised to access this page</Message>
                : (
                    <FormContainer>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className="mt-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Name"
                                    value = {name}
                                    onChange = {(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand' className="mt-2">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Brand"
                                    value = {brand}
                                    onChange = {(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category' className="mt-2">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Category"
                                    value = {category}
                                    onChange = {(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='description' className="mt-2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Cescription"
                                    value = {description}
                                    onChange = {(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price' className="mt-2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type = "number"
                                    placeholder = "Enter price"
                                    value = {price}
                                    onChange = {(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='countInStock' className="mt-2">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type = "number"
                                    placeholder = "Enter stock"
                                    value = {countInStock}
                                    onChange = {(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image' className="mt-2">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Image"
                                    value = {image}
                                    onChange = {(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" className="mt-2">
                                Update 
                            </Button>
                        </Form>
                    </FormContainer>
                )
            }
        </div>
    )

}
export default ProductEditScreen;