import { Button, CircularProgress, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { register } from '../../api/user-service';
import { Email } from '../form-fields/Email';
import { FirstName } from '../form-fields/FirstName';
import { LastName } from '../form-fields/LastName';
import { Password } from '../form-fields/Password';


const validationSchema = yup.object({
  firstName: yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function Register() {
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true)
    register(values)
      .then(() => {
        console.log("Registeration Succes")
        setRegisterSuccess(true)
        setRegisterError('')
        setSubmitting(false);
        setLoading(false)
        resetForm()

      })
      .catch(() => {
        setLoading(false)
        setRegisterError('Something went wrong!Please try after sometime')

      })
  }
  return (
    <>
      {loading && <CircularProgress />}
      <h1>Register</h1>
      {registerError && <Typography color='error'>{registerError}</Typography >}
      {registerSuccess && <Typography >Registration Successful! Please login to continue</Typography >}

      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <FirstName />
            <LastName />
            <Email />
            <Password />

            <Button type='submit' variant="contained" color="primary">
              Register
            </Button>
          </form>
        )}
      </Formik>
    </>
  )

}

export default Register