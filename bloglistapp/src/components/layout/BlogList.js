import React from 'react'
import Blog from '../Blog'
import { Table } from 'react-bootstrap';

 export const BlogList = ({blogs, handleLikesIncrease, handleBlogDelete}) => {
    return (
      <div>
        <h2>Blogs</h2>
        <Table>
          <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}><Blog blog={blog} handleLikes={handleLikesIncrease} handleDelete={handleBlogDelete} /></tr>
          )}
          </tbody>
        </Table>
      </div>
    )
  }

