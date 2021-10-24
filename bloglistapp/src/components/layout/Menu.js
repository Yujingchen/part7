import React from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'
export const Menu = ({user, handleLogoutSubmit}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle bg="primary" aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {/* <Link to='login'>Login </Link> */}
        <Nav.Link as="span">
          <Link to='/' style={padding}>Blogs</Link>
        </Nav.Link>
        <Nav.Link as="span">
          <Link to='/createBlog' style={padding}>Create New</Link>
        </Nav.Link>
        {/* <Link to='/about' style={padding}>About</Link> */}
      </Navbar.Collapse>
      {user !== null &&
          <p>{user.username} <span><button onClick={(e) => handleLogoutSubmit(e)}>logout</button></span></p>
      }
    </Navbar>
  )
}
