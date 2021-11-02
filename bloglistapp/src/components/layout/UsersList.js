import React from 'react'
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TableCell
} from '@material-ui/core'

const userRow = (user)=>{
  return (
    <TableRow key={user.id}>
      <TableCell align="center">
        <Link to={`/users/${user.id}`}>  
          {user.name}
        </Link>
      </TableCell>
      <TableCell align="center">
        {user?.blogs?.length}
      </TableCell>
    </TableRow>
  )
}

 export const UsersList = ({users}) => {
    return (
      <div style={{width: "400px"}}>
        <h2>Blogs</h2>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                user name</TableCell>
              <TableCell align="center">blogs created</TableCell>
            </TableRow>
            {users.map(user => userRow(user))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    )
  }

