import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = ({
  loginUser,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleTextChange = (event) => {
    switch (event.target.name) {
    case 'username':
      setUsername(event.target.value)
      break
    case 'password':
      setPassword(event.target.value)
      break
    default:
      break
    }
  }
  const login = (event) => {
    event.preventDefault()
    const loginData = {
      username: username,
      password: password,
    }
    loginUser(loginData)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Form onSubmit={login}>
        <Form.Group>
          <div>
            <Form.Label>username </Form.Label>
            <Form.Control type='text' value={username} name="username" id='username'
              onChange={(event) => handleTextChange(event)} />
          </div>
          <div>
            <Form.Label>password </Form.Label>
            <Form.Control type='password' value={password} name="password" id="password"
              onChange={(event) => handleTextChange(event)} />
          </div>
          <Button variant="primary" type="submit" id="login-button">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm
