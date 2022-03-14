import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap"; 
import { useDispatch, useSelector } from "react-redux"; 
// import { register } from "../redux/actions/userActions";
import FormContainer from '../components/FormContainer';


const ShippingScreen = (props) =>{
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const submithandler =(e)=>{
        e.preventDefault()
        console.log("submitted")
    }

    return(
        <FormContainer>
            <h1>Shipping Address</h1>
            <Form onSubmit={submithandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required 
                        type = "Address"
                        placeholder = "Enter Address"
                        value = {address}
                        onChange = {(e)=>setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required 
                        type = "City"
                        placeholder = "Enter City"
                        value = {city}
                        onChange = {(e)=>setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required 
                        type = "Postal Code"
                        placeholder = "Enter Postal Code"
                        value = {postalCode}
                        onChange = {(e)=>setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required 
                        type = "Country"
                        placeholder = "Enter Country"
                        value = {country}
                        onChange = {(e)=>setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2">Continue to checkout</Button>
            </Form>
        </FormContainer>
    )
}
export default ShippingScreen