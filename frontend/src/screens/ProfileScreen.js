import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from "react-bootstrap"; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux"; 
import { getUserDetails } from "../redux/actions/userActions";

const ProfileScreen = ({ history}) =>{

        // Redux imports 
        const dispatch = useDispatch()
        const { user, loading, error } =  useSelector(state => state.userDetails)
        const { userInfo } = useSelector(state => state.userLogin)

        const [ email, setEmail ] = useState('')
        const [ name, setName ] = useState('')
        const [ password, setPassword ] = useState('')
        const [ confirmPassword, setConfirmPassword ] = useState('')
        const [ message, setMessage ] = useState('')
        const [editProfile, setEditProfile] = useState(false)

        useEffect(()=>{
            // Not logged in 
            if(!userInfo){
                history.push('/login')
            }else{
                // user is logged in 
                if(!user || !user.name){
                    // if there is no userinfo
                    dispatch(getUserDetails('profile'))
                }else{
                    setEmail(user.email)
                    setName(user.name)
                }
            }
        }, [dispatch, history, user, userInfo])
    
    
        const submitHandler = (e) =>{
            e.preventDefault()
            if(password !== confirmPassword){
                setMessage('The passwords do not match')
            }else{
                // dispatch data to backend
                console.log('Updating...')
                setEditProfile(false)
            }
            
        }
    
        return(
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant="info">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader/>}
                    {editProfile
                        ? (
                            <Form onSubmit = {submitHandler}> 
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required 
                                    type = "name"
                                    placeholder = "Enter Name"
                                    value = {name}
                                    onChange = {(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    required
                                    type = "email"
                                    placeholder = "Enter Email"
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type = "password"
                                    placeholder = "Confirm Password"
                                    value = {confirmPassword}
                                    onChange = {(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='passwordConfirm'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type = "password"
                                    placeholder = "Enter Password"
                                    value = {password}
                                    onChange = {(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="primary" className="mt-2">Change Details</Button>
                        </Form>
                        ):
                        (
                            <div>
                                <p>Name</p>
                                <Alert variant='dark'>{name}</Alert>
                                <p>Email</p>
                                <Alert variant='dark'>{email}</Alert>
                                <Button 
                                    variant="primary"
                                    onClick = {() => setEditProfile(true)}
                                >
                                    Change Details
                                </Button>
                            </div>
                        )
                    }

                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        )
}

export default ProfileScreen