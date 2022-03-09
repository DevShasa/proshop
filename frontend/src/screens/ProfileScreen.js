import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from "react-bootstrap"; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux"; 
import { getUserDetails, updateUserProfile } from "../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants"

const ProfileScreen = ({ history}) =>{

        // Redux imports 
        const dispatch = useDispatch()


        const [ email, setEmail ] = useState('')
        const [ name, setName ] = useState('')
        const [ password, setPassword ] = useState('')
        const [ confirmPassword, setConfirmPassword ] = useState('')
        const [ message, setMessage ] = useState('')
        const [editProfile, setEditProfile] = useState(false)

        // Data from userDetails reducer, whic is updated when this component lods
        const { user, loading, error } =  useSelector(state => state.userDetails)
        // Data from userLogin reducer to make sure that user  is logged in before any changes
        const { userInfo } = useSelector(state => state.userLogin)
        // Data from the userUpdate reducer which gets updated when user update request is successful
        const { success } = useSelector(state => state.userUpdate)

        useEffect(()=>{
            // Not logged in 
            if(!userInfo){
                history.push('/login')
            }else{
                // user is logged in 
                if(!user || !user.name || success){
                    dispatch({
                        type: USER_UPDATE_PROFILE_RESET
                    })
                    // if there is no userinfo or there is updateprofiledata
                    dispatch(getUserDetails('profile'))
                }else{
                    setEmail(user.email)
                    setName(user.name)
                }
            }
        }, [dispatch, history, user, userInfo, success])
    
    
        const submitHandler = (e) =>{
            e.preventDefault()
            if(password !== confirmPassword){
                setMessage('The passwords do not match')
            }else{
                // dispatch data to backend
                dispatch(updateUserProfile({
                    // 'id': user._id,
                    'name': name,
                    'email': email,
                    'password': password
                }))
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