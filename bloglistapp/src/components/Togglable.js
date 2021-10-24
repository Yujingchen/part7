import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'

const Togglable = (props, ref) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility: () => { toggleVisibility() }
    }
  })
  return (
    <div >
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div >
  )
}
const FowardTogglable = React.forwardRef(Togglable)
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default FowardTogglable