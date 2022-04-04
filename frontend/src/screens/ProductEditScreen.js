import React, {useState, useEffect} from 'react';
// import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { listProductDetail } from '../redux/actions/productActions';

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
                if(!product.name || product._id !== Number(productID)){
                    dispatch(listProductDetail(productID))
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
    },[product, dispatch,productID, props, userInfo])

    function submitHandler(e){
        e.preventDefault()
        console.log({
            name, brand, category, image, price, countInStock, description
        })
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
                        <p>{name}</p>
                        <p>{description}</p>
                    </FormContainer>
                )
            }
        </div>
    )

}
export default ProductEditScreen;