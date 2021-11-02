import React from 'react'
import Blog from '../Blog'
import {
  useParams
} from "react-router-dom";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

 export const User = ({users, handleLikesIncrease, handleBlogDelete}) => {
  let { id } = useParams();
  const user = users.find(user=>user.id === id)
    if(!user){
        return null
    }
    const { blogs } = user
    if(blogs.length===0){
        return <div> No blogs were found, you can create a new blog </div>
    }
    return (
        <div>
            <h2>Blogs</h2>
            <TableContainer component={Paper}>
            <Table>
            <TableBody>
            {blogs?.map(blog =>
                <TableRow key={blog.id}><Blog blog={blog} handleLikes={handleLikesIncrease} handleDelete={handleBlogDelete} /></TableRow>
            )}
            </TableBody>
            </Table>
            </TableContainer>
        </div>
        )
  }

