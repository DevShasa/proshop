import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/actions/userActions";

const Header=()=>{

  const { cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.userLogin) 
  const dispatch = useDispatch()

  const logoutHandler = () =>{
    console.log("logout")
    dispatch(logout())
  }
  return(
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand >ProShop</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="mr-auto">

                <LinkContainer to="/cart"> 
                  <Nav.Link >
                    <i className="fas fa-shopping-cart"></i> Cart{cartItems.length !== 0 && `(${cartItems.length})`}
                  </Nav.Link>
                </LinkContainer>

                {userInfo
                  ? (
                    // <LinkContainer to="/">
                    //   <Nav.Link ><i className="fas fa-user"></i> {userInfo.name}</Nav.Link>
                    // </LinkContainer>
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item
                          onClick = {logoutHandler}
                        >
                          Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                  ):(
                    <LinkContainer to="/login">
                      <Nav.Link ><i className="fas fa-user"></i> Login</Nav.Link>
                    </LinkContainer>
                  )
                }
                
              </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}
export default Header