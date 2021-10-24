import React from 'react'
import Blog from '../Blog'
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

 export const BlogList = ({blogs, handleLikesIncrease, handleBlogDelete}) => {
    return (
      <div>
        <h2>Blogs</h2>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {blogs.map(blog =>
            <TableRow key={blog.id}><Blog blog={blog} handleLikes={handleLikesIncrease} handleDelete={handleBlogDelete} /></TableRow>
          )}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    )
  }

