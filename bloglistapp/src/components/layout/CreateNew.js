import React from 'react'
import BlogForm from '../BlogForm'
import Togglable from '../Togglable'

export const CreateNew = ({handleSaveSubmit, formRef}) => {
    return (
      <div>
        <h1>create new</h1>
        {
          <Togglable buttonLabel='new blog' ref={formRef}>
            <BlogForm
              createBlog={handleSaveSubmit}>
            </BlogForm>
          </Togglable>
        }
    </div>)
  }