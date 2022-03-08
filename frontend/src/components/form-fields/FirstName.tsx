import { FormControl, TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React from 'react'

export default function FirstName() {
  const name = 'firstName'
  const [field] = useField(name)
  const { errors, touched }: any = useFormikContext()

  //  console.log('FirstName Component:-', field, meta)

  return (
    <FormControl fullWidth margin="dense">
      <TextField
        label="FirstName"
        variant="outlined"
        id="firstName"
        type="text"
        {...field}
        error={touched.firstName && Boolean(errors.firstName)}
        helperText={touched.firstName && errors.firstName}
      />
    </FormControl>
  )
}
