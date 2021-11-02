import React, { useState, useRef, useEffect } from 'react'
import {
  Switch, Route, useHistory
} from "react-router-dom"
import Container from '@material-ui/core/Container'
import { useSelector, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import { Menu } from './components/layout/Menu'
import { Notification } from './components/layout/Notification'
import { BlogList } from './components/layout/BlogList'
import { Blog } from './components/layout/Blog'
import { User } from './components/layout/User'
import { CreateNew } from './components/layout/CreateNew'
import { Footer } from './components/layout/Footer'
import { Login } from './components/layout/Login'
import { Home } from './components/layout/Home'
import { UsersList } from './components/layout/UsersList'
import { initBlogAction, updateBlogAction, deleteBlogAction, updateBlogCommentAction } from './reducer/blogReducer'
import { initUserAction } from './reducer/userReducer'
import { setNotification, clearNotification, setErorrMessage } from './reducer/notificationReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const initBlogs = useSelector(state => state.blogs)
  const initUsers = useSelector(state => state.users)
  const notification = useSelector(state=>state.notification.notification)
  const errorMessage = useSelector(state=>state.notification.error)
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    dispatch(initBlogAction())
    dispatch(initUserAction())
  }, [dispatch])

  useEffect(()=>{
    setBlogs(initBlogs)
    setUsers(initUsers)
  },[initBlogs, initUsers, blogs])

  const handleLoginSubmit = async (loginData) => {
    try {
      const loginUser = await loginService.login(loginData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )
      window.localStorage.setItem('loggedIn', true)
      setUser(loginUser)
      blogService.setToken(loginUser.token)
      dispatch(setNotification(`welcome ${loginUser.name}`))
      dispatch(clearNotification(5))
    }
    catch (error) {
      dispatch(setErorrMessage(`password or username is incorrect`))
      dispatch(clearNotification(5))
    }
  }

  const handleLogoutSubmit = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef(null)
  const history = useHistory();

  const handleSaveSubmit = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.postNewBlog(newBlog)
      const newBlogs = blogs.concat(savedBlog)
      setBlogs(newBlogs)
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added!!`))
      dispatch(clearNotification(5))
      history.push('/blogs')
    }
    catch (error) {
      dispatch(setErorrMessage('something went wrong when saving the new blog, please enter again'))
      dispatch(clearNotification(5))
    }
  }

  const handleLikesIncrease = async (event, id) => {
    event.preventDefault()
    try {
      const blogToUpdate = blogs.find(blog => blog.id === id)
      const { likes } = blogToUpdate;
      let incrementlikes =  likes + 1
      const newBlog = {...blogToUpdate, likes: incrementlikes}
      dispatch(updateBlogAction(newBlog))
    }
    catch (error) {
      dispatch(setErorrMessage('something went wrong when updating like for the blog, please enter again'))
      dispatch(clearNotification(5))
      console.log(error)
    }
  }

  const handleAddComment = async (event, id, comment) => {
    event.preventDefault()
    try {
      const blogToUpdate = blogs.find(blog => blog.id === id)
      const newBlog = {...blogToUpdate, comments: blogToUpdate?.comments?.concat(comment)}
      const updatedBlogs = blogs.filter(blog=>{
        if(blog.id === id) {
          return newBlog
        }
          return blog
      })
      dispatch(updateBlogCommentAction(newBlog))
    }
    catch (error) {
      dispatch(setErorrMessage('something went wrong when updating comment for the blog, please enter again'))
      dispatch(clearNotification(5))
      console.log(error)
    }
  }

  const handleBlogDelete = async (event, id) => {
    event.preventDefault()
    const blogToDelete = blogs.find(blog=>blog.id===id)
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        dispatch(deleteBlogAction(blogToDelete))
        dispatch(setNotification(`Blog by ${blogToDelete.author} is deleted`))
        dispatch(clearNotification(5))
      }
      catch (error) {
      dispatch(setErorrMessage(`something went wrong when deleting the blog, please try again`))
      dispatch(clearNotification(5))
      }
    }
  }

  return (
    <Container style={{height:"100%", width:"100%"}} className="container">
      <Menu user={user} handleLogoutSubmit={handleLogoutSubmit}/>
      <Notification errorMessage={errorMessage} notification={notification}/>
      {user === null &&
        <Login handleLoginSubmit={handleLoginSubmit}/>
      }
      {user !== null &&
        <div style={{height:"100%", width:"100%", position:"relative"}}>
          <Switch>
            <Route path="/createBlog">
              <CreateNew handleSaveSubmit={handleSaveSubmit} formRef={blogFormRef}/>
            </Route>
            <Route path="/blogs/:id">
              <Blog blogs={blogs} handleLikesIncrease={handleLikesIncrease} handleAddComment={handleAddComment}/>
            </Route>
            <Route path="/blogs">
              <BlogList blogs={blogs} handleLikesIncrease={handleLikesIncrease} handleBlogDelete={handleBlogDelete}/>
            </Route>
            <Route path="/users/:id">
              <User users={users} handleLikesIncrease={handleLikesIncrease} handleBlogDelete={handleBlogDelete}/>
            </Route>
            <Route path="/users">
              <UsersList users={users}/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      }
      <Footer/>
    </Container >
  )
}
export default App