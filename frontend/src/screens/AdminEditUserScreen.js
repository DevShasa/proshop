import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetUserByIdAction, adminUpdateUserAction } from '../redux/actions/userActions';
import FormContainer from '../components/FormContainer';
import { ADMIN_UPDATE_USER_RESET } from "../redux/constants/userConstants"; 
const AdminEditUserScreen = (props) =>{

    const dispatch = useDispatch()
    const { loading, user, error } = useSelector(state =>state.adminGetUser)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success, userUpdateError } = useSelector(state => state.adminUserUpdate)

    const [ email, setEmail ] = useState("")
    const [ name, setName ] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        if(!userInfo){
            props.history.push('/login')
        }else{
            if(!user || !user.name || user._id !==  parseInt(props.match.params.id)  || success){
                // If user does not exist, does not match url id, details have already changed
                dispatch({type: ADMIN_UPDATE_USER_RESET}) 
                dispatch(adminGetUserByIdAction(props.match.params.id))
            }else{
                setEmail(user.email)
                setName(user.name)
                setIsAdmin(user.isAdmin)
            }

        }
    }, [dispatch, props.match.params.id, userInfo, props.history, user, success])


    

    function submitHandler(e){
        e.preventDefault()
        dispatch(adminUpdateUserAction(
            props.match.params.id,
            { name, email, isAdmin}
        ))
    }

    return(
        <FormContainer>
            {loading 
                ? <Loader />
                : error
                ? <Message>{error}</Message>
                :(<div>
                    <h2>{`Change ${user.name}'s details`}</h2>
                    { userUpdateError && <Message variant="danger">{userUpdateError}</Message>}
                    <Form onSubmit = {submitHandler}>
                        <Form.Group controlId='username' className="mt-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type = "name"
                                placeholder = "Enter Name"
                                value = {name}
                                onChange = {(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className="mt-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type = "email"
                                placeholder = "Enter Email"
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="Checkbox">
                            <Form.Check 
                                type="checkbox" 
                                label="Admin"
                                checked = {isAdmin} 
                                onChange = {(e) => setIsAdmin(e.currentTarget.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                )
            }
        </FormContainer>
    )

}

export default AdminEditUserScreen