import React from 'react'
import { Alert } from '@material-ui/lab'

export const Notification = ({errorMessage, notification}) => {
    return (
      <div>
        {errorMessage && <Alert severity="danger" >
          {errorMessage}
        </Alert>}
        {notification && <Alert severity="success" >
          {notification}
        </Alert>}
      </div>
    )
  }

