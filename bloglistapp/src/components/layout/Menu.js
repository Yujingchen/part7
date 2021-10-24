import React from 'react'
import { Link } from "react-router-dom"
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'

export const Menu = ({user, handleLogoutSubmit}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        {/* <Link to='login'>Login </Link> */}
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/createBlog">
          Create New
        </Button>
        {/* <Link to='/about' style={padding}>About</Link> */}
      {user !== null &&
          <p style={{marginBottom: "0"}}>{user.username} <span><Button color="inherit" onClick={(e) => handleLogoutSubmit(e)}>logout</Button></span></p>
      }
      </Toolbar>
    </AppBar>
  )
}
