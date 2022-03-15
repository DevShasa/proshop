import React, { useState } from 'react';
import { Form, Button, Col } from "react-bootstrap"; 
import { useDispatch, useSelector } from "react-redux"; 
import { savePaymentMethod } from "../redux/actions/cartActions";
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

// User selects payment method 
export const PaymentScreen = (props)=>{
    const { shippingAddress } = useSelector(state=> state.cart)
    const dispatch = useDispatch()

    if(!shippingAddress.address){
        props.history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log('PAYMENT: ',paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        // props.history.push('/placeorder')
    }

    return(
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group onChange={(e)=>setPaymentMethod(e.target.value)}>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label="Paypal"
                            id = 'paypal'
                            name = 'paymentMethod'
                            value = "Paypal"
                        >
                        </Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            label="Mpesa"
                            id = 'mpesa'
                            name = 'paymentMethod'
                            value = "Mpesa"
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;