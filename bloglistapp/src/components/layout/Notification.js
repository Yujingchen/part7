import React from 'react'
import { Alert } from 'react-bootstrap'

export const Notification = ({errorMessage, notification}) => {
    return (
      <div>
        {errorMessage && <Alert variant="danger" >
          {errorMessage}
        </Alert>}
        {notification && <Alert variant="success" >
          {notification}
        </Alert>}
      </div>
    )
  }

