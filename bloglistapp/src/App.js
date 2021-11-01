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
import { CreateNew } from './components/layout/CreateNew'
import { Footer } from './components/layout/Footer'
import { Login } from './components/layout/Login'
import { Home } from './components/layout/Home'
import { initBlogAction } from './reducer/blogReducer'
import { setNotification, clearNotification } from './reducer/notificationReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const initBlogs = useSelector(state => state.blogs)
  const notification = useSelector(state.notification)
  const [blogs, setBlogs] = useState([])
  console.log('initBlogs',initBlogs)
  console.log('blogs',blogs)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    dispatch(initBlogAction())
  }, [dispatch])

  useEffect(()=>{
    setBlogs(initBlogs)
  },[initBlogs])

  const handleLoginSubmit = async (loginData) => {
    try {
      const loginUser = await loginService.login(loginData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )
      window.localStorage.setItem('loggedIn', true)
      setUser(loginUser)
      blogService.setToken(loginUser.token)
      setNotification(`welcome ${loginUser.name}`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    catch (error) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
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
      // setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      // setTimeout(() => {
      //   setNotification('')
      // }, 5000)
      history.push('/blogs')
    }
    catch (error) {
      // setTimeout(() => {
      //   setErrorMessage('')
      // }, 5000)
      // setErrorMessage('something went wrong when saving the new blog, please enter again')
    }
  }

  const handleLikesIncrease = async (event, id) => {
    event.preventDefault()
    try {
      console.log('blogs', blogs)
      const elementsIndex = blogs.findIndex(blog => blog.id === id)
      const blogToUpdate = blogs[elementsIndex]
      const newBlog = {
        user: blogToUpdate.user.id,
        likes: blogToUpdate.likes + 1,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url
      }
      const newBlogs = [...blogs]
      const updatedBlog = await blogService.updateBlog(blogToUpdate.id, newBlog)
      newBlogs[elementsIndex] = updatedBlog
      setBlogs(newBlogs)
    }
    catch (error) {
      console.log(error)
      // setTimeout(() => {
      //   setErrorMessage('')
      // }, 5000)
      // setErrorMessage('something went wrong when updating like for the blog, please enter again')
    }
  }


  const handleBlogDelete = async (event, id) => {
    event.preventDefault()
    const elementsIndex = blogs.findIndex(blog => blog.id === id)
    const blogToDelete = blogs[elementsIndex]
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        await blogService.deleteBlog(blogToDelete)
        const newBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(newBlogs)
      // setNotification(`Blog by ${blogToDelete.author} is deleted`)
      // setTimeout(() => {
      //   setNotification('')
      // }, 5000)
      }
      catch (error) {
        // setTimeout(() => {
        //   setErrorMessage('')
        // }, 5000)
        // setErrorMessage('something went wrong when deleting the blog, please enter again')
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
            <Route path="/blogs">
              <BlogList blogs={blogs} handleLikesIncrease={handleLikesIncrease} handleBlogDelete={handleBlogDelete}/>
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