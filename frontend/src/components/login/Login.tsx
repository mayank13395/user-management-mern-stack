import { Button, CircularProgress, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { login } from '../../api/user-service'
import Email from '../form-fields/Email'
import Password from '../form-fields/Password'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

function Login() {
  console.log('Login Component')

  const [loginError, setLoginError] = useState('')
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: any) => {
    // call login endpoint
    console.log('On Login Submit:-', values)
    setLoading(true)
    login(values)
      .then(() => {
        console.log('Login Succes')
        history.push('/')
      })
      .catch(() => {
        setLoginError('Invalid Credentials')
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <CircularProgress />}
      <h1>Login</h1>
      {loginError && <Typography color="error">{loginError}</Typography>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Email />
            <Password />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Login
