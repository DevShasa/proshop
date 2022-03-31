import React, { useEffect } from 'react';
import { Table } from "react-bootstrap";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux"; 
import { listProducts } from '../redux/actions/productActions';

const AdminProductList = () =>{

    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.productList)
    

    return(
        <div>
            Wolan
        </div>
    )
}
export default AdminProductList