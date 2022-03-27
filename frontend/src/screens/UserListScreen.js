import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button} from "react-bootstrap"; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from "react-redux"; 
import { adminFetchUserList } from "../redux/actions/userActions";

const UserListScreen=()=>{

    const dispatch = useDispatch()
    const { 
            adminUserListLoading, 
            adminUserList, 
            adminUserRequestError
        } = useSelector(state => state.adminUserDisplay)
    
    // Is the user Logged in 
    const { loggedIn } = useSelector(state => state.userLogin)

    useEffect(()=>{
        if(loggedIn){
            dispatch(adminFetchUserList())
        }
    },[dispatch, loggedIn])

    const deleteHandler = (id) =>{
        console.log(`deleting user ${id}`)
    }

    return(
        <div>
            <h1>Users</h1>
            {adminUserListLoading 
            ? <Loader />
            : adminUserRequestError
            ? <Message variant="info">{adminUserRequestError}</Message>
            : !loggedIn
            ? <Message variant="warning">You need to log in to perform that action</Message>
            : (<Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>USERNAME</th> 
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminUserList.map(user =>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.isAdmin 
                                    ? <i className='fas fa-check' style={{color: 'green'}}></i> 
                                    : <i className='fas fa-check' style={{color: 'red'}}></i> }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}`}>
                                        <Button variant="primary" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </Table>)
            }

        </div>

    )
}

export default UserListScreen