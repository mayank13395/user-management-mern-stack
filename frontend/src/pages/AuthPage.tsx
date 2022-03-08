import { Box, Grid } from '@material-ui/core'
import React from 'react'
import Login from '../components/login/Login'
import Register from '../components/register/Register'

function AuthPage() {
  return (
    <Box m={10}>
      <Grid container spacing={8}>
        <Grid item md={6}>
          <Register />
        </Grid>
        <Grid item md={6}>
          <Login />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AuthPage
