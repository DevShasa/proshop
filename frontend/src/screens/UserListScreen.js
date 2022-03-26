import React, { useState, useEffect } from 'react';
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

    useEffect(()=>{
        dispatch(adminFetchUserList())
    },[dispatch])

    return(
        <div>
            <h1>Users</h1>
            {adminUserListLoading 
            ? <Loader />
            : adminUserRequestError
            ? <Message variant="info">{adminUserRequestError}</Message>
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
                                        <Button variant="primary" className="btn-sm">Edit User</Button>
                                    </LinkContainer>
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