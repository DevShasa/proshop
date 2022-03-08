import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap"; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux"; 
import { getUserDetails } from "../redux/actions/userActions";
import FormContainer from '../components/FormContainer';

const ProfileScreen = ({ history}) =>{

        // Redux imports 
        const dispatch = useDispatch()
        const { user, loading, error } =  useSelector(state => state.userDetails)
        const { userInfo } = useSelector(state => state.userLogin)
    
        const [userData, setuserData] = useState({
            email: '',
            name: '',
            password: '',
            confirmPassword: '', 
            message: ''
        })
    
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
                    // if there is user info update state
                    setuserData({
                        ...userData,
                        email: user.email,
                        name: user.name
                    })
                }
            }
        }, [dispatch, history, user, userInfo, userData])
    
        const handleChange = (e) => {
            setuserData({ ...userData,  [e.target.name]: e.target.value })
        }
    
        const submitHandler = (e) =>{
            e.preventDefault()
    
            if(userData.password !== userData.confirmPassword){
                setuserData({
                    ...userData,
                    message: "Passwords do not match"
                })
            }else{
                // dispatch data to backend
                console.log('Updating...')
            }
            
        }
    
        return(
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        )
}

export default ProfileScreen