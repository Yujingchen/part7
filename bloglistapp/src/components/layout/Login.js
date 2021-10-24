import React from 'react'
import Togglable from '../Togglable'
import LoginForm from './LoginForm'
export const Login = ({handleLoginSubmit}) => {
    return (
        <>
          <h2>Login</h2>
          <Togglable buttonLabel='login'>
            <LoginForm loginUser={handleLoginSubmit} />
          </Togglable>
        </>)
  }